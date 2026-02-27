import { Types } from "mongoose";

export interface IExpense {
    user: Types.ObjectId;
    title: string;
    category: "fixed" | "variable" | "optional";
    recurrence: "once" | "weekly" | "fortnight" | "monthly";
    amount: number;
    deadline: Date;
}
