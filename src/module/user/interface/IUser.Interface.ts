import { Document } from "mongoose";

export interface IUser extends Document {
    givenname: string;
    surname: string;
    birthdate: Date;
    sex: "prefer not to say" | "male" | "female";
    budget: number;
    address: string;
    mobile: string;
    email: string;
    username: string;
    password: string;
    role: "user" | "admin";
}
