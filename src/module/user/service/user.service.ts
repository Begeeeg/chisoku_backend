import mongoose from "mongoose";
import { AppError } from "../../../common/utils/appError";
import User from "../model/User.model";
import { UserBody } from "../types/user.types";
import Expense from "../../expense/model/Expense.model";
import bcrypt from "bcryptjs";
import { getAge } from "../../../common/utils/getAge";

// Get user by ID
export const getUser = async (userId: string) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError("Invalid user ID", 400);
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};

// Update user
export const updateUser = async (userId: string, data: Partial<UserBody>) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError("Invalid user ID", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }

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
    } = data;

    // Check duplicates
    if (mobile || email || username) {
        const existing = await User.findOne({
            _id: { $ne: userId },
            $or: [
                ...(mobile ? [{ mobile }] : []),
                ...(email ? [{ email }] : []),
                ...(username ? [{ username }] : []),
            ],
        });

        if (existing) {
            if (mobile && existing.mobile === mobile) {
                throw new AppError("Mobile number already exists", 400);
            }

            if (email && existing.email === email) {
                throw new AppError("Email already exists", 400);
            }

            if (username && existing.username === username) {
                throw new AppError("Username already exists", 400);
            }
        }
    }

    // Validate names
    if (givenname && givenname.trim().length < 2) {
        throw new AppError("Given name must be at least 2 characters", 400);
    }

    if (surname && surname.trim().length < 2) {
        throw new AppError("Surname must be at least 2 characters", 400);
    }

    // Validate birthdate
    if (birthdate) {
        const birthDateObj = new Date(birthdate);
        const age = getAge(birthDateObj);

        if (age === null) {
            throw new AppError("Invalid birthdate", 400);
        }

        if (age < 18) {
            throw new AppError("You must be 18 years or older", 400);
        }
    }

    // Validate mobile
    if (mobile) {
        const mobileRegex = /^\+?[1-9]\d{11,14}$/;
        if (!mobileRegex.test(mobile)) {
            throw new AppError("Invalid mobile number format", 400);
        }
    }

    // Validate email
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new AppError("Invalid email format", 400);
        }
    }

    // Hash password if updated
    let hashedPassword;
    if (password) {
        if (password.length < 8) {
            throw new AppError("Password must be at least 8 characters", 400);
        }

        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            ...(givenname && { givenname: givenname.trim() }),
            ...(surname && { surname: surname.trim() }),
            ...(sex && { sex }),
            ...(birthdate && { birthdate }),
            ...(address && { address }),
            ...(mobile && { mobile }),
            ...(email && { email: email.trim() }),
            ...(username && { username: username.trim() }),
            ...(hashedPassword && { password: hashedPassword }),
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password");

    return updatedUser;
};

export const deleteUser = async (userId: string) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError("Invalid user ID", 400);
    }

    // delete all expenses of the user
    await Expense.deleteMany({ user: userId });

    // delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
        throw new AppError("User not found", 404);
    }

    return deletedUser;
};
