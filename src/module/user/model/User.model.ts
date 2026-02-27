import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/IUser.Interface";
import { addAgeVirtual } from "./virtualSchema/ageVirtual";

const userSchema = new Schema<IUser>(
    {
        givenname: {
            type: String,
            required: true,
            minlength: 2,
            trim: true,
        },
        surname: {
            type: String,
            required: true,
            minlength: 2,
            trim: true,
        },
        birthdate: {
            type: Date,
            required: true,
        },
        sex: {
            type: String,
            enum: ["prefer not to say", "male", "female"],
            default: "prefer not to say",
            required: true,
        },
        budget: {
            type: Number,
            default: 0,
            min: 0,
        },
        address: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    { timestamps: true }
);

addAgeVirtual(userSchema);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
