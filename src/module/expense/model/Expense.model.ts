import mongoose, { Schema } from "mongoose";
import { IExpense } from "../interface/IExpense.interface";

const expenseSchema = new Schema<IExpense>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["optional", "variable", "fixed"],
            required: true,
        },
        recurrence: {
            type: String,
            enum: ["once", "weekly", "fortnight", "monthly"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        deadline: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;
