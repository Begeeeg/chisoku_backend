import mongoose from "mongoose";
import { AppError } from "../../../common/utils/appError";
import { dateValidator } from "../../../common/utils/dateValidator";
import Expense from "../model/Expense.model";
import { ExpenselistBody } from "../types/expense.types";

export const createlistService = async (
    userId: string,
    data: ExpenselistBody
) => {
    const { title, category, recurrence, amount, deadline } = data;

    if (!title || !title.trim()) {
        throw new AppError("Add title", 400);
    }

    if (!category) {
        throw new AppError("Choose category", 400);
    }

    if (!recurrence) {
        throw new AppError("Choose recurrence", 400);
    }

    if (amount < 1 || amount === undefined || amount === null) {
        throw new AppError("Add amount", 400);
    }

    if (!deadline) {
        throw new AppError("Choose deadline", 400);
    }

    const validatedDeadline = dateValidator(deadline);

    const newExpense = await Expense.create({
        user: userId,
        title: title.trim(),
        category,
        recurrence,
        amount,
        deadline: validatedDeadline,
    });

    return newExpense;
};

export const getlistService = async (userId: string) => {
    const expenseList = await Expense.find({ user: userId }).sort({
        createdAt: -1,
    });

    return expenseList;
};

export const updatelistService = async (
    userId: string,
    listId: string,
    data: ExpenselistBody
) => {
    const { title, category, recurrence, amount, deadline } = data;

    if (!userId) {
        throw new AppError("Unauthorized", 400);
    }

    if (!title || !title.trim()) {
        throw new AppError("Add title", 400);
    }

    if (!category) {
        throw new AppError("Choose category", 400);
    }

    if (!recurrence) {
        throw new AppError("Choose recurrence", 400);
    }

    if (amount === undefined || amount === null) {
        throw new AppError("Add amount", 400);
    }

    if (!deadline) {
        throw new AppError("Choose deadline", 400);
    }

    const validatedDeadline = dateValidator(deadline);

    const updatedExpense = await Expense.findOneAndUpdate(
        {
            _id: listId,
            user: userId,
        },
        {
            ...(title && { title }),
            ...(category && { category }),
            ...(recurrence && { recurrence }),
            ...(amount !== undefined && { amount }),
            ...(deadline && { deadline: validatedDeadline }),
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedExpense) {
        throw new AppError("List not found", 400);
    }

    return updatedExpense;
};

export const deletelistService = async (userId: string, listId: string) => {
    const deletedExpense = await Expense.findOneAndDelete({
        _id: listId,
        user: userId,
    });
    if (!deletedExpense) {
        throw new AppError("List not found", 400);
    }

    return deletedExpense;
};

export const getTotalExpensesService = async (userId: string) => {
    const result = await Expense.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" },
            },
        },
    ]);

    return result[0]?.total || 0;
};

export const getByIdService = async (userId: string, listId: string) => {
    const expense = await Expense.findOne({
        _id: listId,
        user: userId,
    });

    if (!expense) {
        throw new AppError("List not found", 400);
    }

    return expense;
};

export const getTotalByCategoryService = async (
    userId: string,
    category?: "fixed" | "variable" | "optional"
) => {
    const matchStage: any = {
        user: new mongoose.Types.ObjectId(userId),
    };

    if (category) {
        matchStage.category = category;
    }

    const result = await Expense.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" },
            },
        },
    ]);

    return result[0]?.total || 0;
};

export const getTotalByRecurrenceService = async (
    userId: string,
    recurrence?: "once" | "weekly" | "fortnight" | "monthly"
) => {
    const matchStage: any = {
        user: new mongoose.Types.ObjectId(userId),
    };

    if (recurrence) {
        matchStage.recurrence = recurrence;
    }

    const result = await Expense.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" },
            },
        },
    ]);

    return result[0]?.total || 0;
};
