import { AppError } from "../../../common/utils/appError";
import User from "../../user/model/User.model";

import bcrypt from "bcryptjs";
import { getAge } from "../../../common/utils/getAge";
import { LoginBody, SignupBody } from "../types/auth.types";

export const signupService = async (data: SignupBody) => {
    const {
        givenname,
        surname,
        sex,
        birthdate,
        address,
        mobile,
        email,
        username,
        password,
        confirmPassword,
    } = data;

    const existing = await User.findOne({
        $or: [{ mobile }, { email }, { username }],
    });

    if (existing) {
        if (existing.mobile === mobile) {
            throw new AppError("Mobile number already exists", 400);
        }

        if (existing.email === email) {
            throw new AppError("Email already exists", 400);
        }

        if (existing.username === username) {
            throw new AppError("Username already exists", 400);
        }
    }

    if (!givenname || !givenname.trim()) {
        throw new AppError("Given name is required", 400);
    }

    if (givenname.length < 2) {
        throw new AppError("Given name must be at least 2 characters", 400);
    }

    if (!surname || !surname.trim()) {
        throw new AppError("Surname is required", 400);
    }

    if (surname.length < 2) {
        throw new AppError("Surname must be at least 2 characters", 400);
    }

    if (!sex) {
        throw new AppError("Please choose male or female", 400);
    }

    if (!birthdate) {
        throw new AppError("Birthdate is required", 400);
    }

    const birthDateObj = new Date(birthdate);
    const age = getAge(birthDateObj);
    if (age === null) {
        throw new AppError("Invalid birthdate", 400);
    }

    if (age < 18) {
        throw new AppError("You must be 18 years or older", 400);
    }

    if (!address) {
        throw new AppError("Address is required", 400);
    }

    if (!mobile) {
        throw new AppError("Mobile number is required", 400);
    }

    const mobileRegex = /^\+?[1-9]\d{11,14}$/;
    if (!mobileRegex.test(mobile)) {
        throw new AppError("Invalid mobile number format", 400);
    }

    if (!email) {
        throw new AppError("Email is required", 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new AppError("Invalid email format", 400);
    }

    if (!username) {
        throw new AppError("Username is required", 400);
    }

    if (!password || !password.trim()) {
        throw new AppError("Password is required", 400);
    }

    if (password.length < 8) {
        throw new AppError("Password must be at least 8 characters", 400);
    }

    if (password !== confirmPassword) {
        throw new AppError("Passwords do not match", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await User.create({
        givenname: givenname.trim(),
        surname: surname.trim(),
        sex,
        birthdate,
        address,
        mobile,
        email: email.trim(),
        username: username.trim(),
        password: hashedPassword,
    });

    return savedUser;
};

export const loginService = async (data: LoginBody) => {
    const { identifier, password } = data;

    const user = await User.findOne({
        $or: [{ username: identifier.trim() }, { email: identifier.trim() }],
    });

    if (!identifier || !password) {
        throw new AppError("All field is required", 400);
    }

    if (!user) {
        throw new AppError("Invalid credentials", 400);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new AppError("Invalid credentials", 400);
    }

    return user;
};
