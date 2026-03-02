import { Request, Response } from "express";
import { ExpenselistBody } from "../types/expense.types";
import {
    createlistService,
    deletelistService,
    getByIdService,
    getlistService,
    getTotalByCategoryService,
    getTotalByRecurrenceService,
    getTotalExpensesService,
    updatelistService,
} from "../service/expense.service";

export const createlistController = async (
    req: Request<{}, {}, ExpenselistBody>,
    res: Response
): Promise<void> => {
    try {
        const service = await createlistService(req.user!._id, req.body);

        res.status(201).json({
            message: "Expense list created successfully",
            data: {
                userId: req.user!._id,
                listId: service._id,
                title: service.title,
                category: service.category,
                recurrence: service.recurrence,
                amount: service.amount,
                deadline: service.deadline,
            },
        });

        console.log("Expense list created successfully:", {
            userId: req.user!._id,
            listId: service._id,
            title: service.title,
        });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error createList controller:", error);
    }
};

export const getlistController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const service = await getlistService(req.user!._id);

        res.status(200).json({
            message: "Expense list retrieved successfully",
            data: service.map((exp) => ({
                listId: exp._id,
                title: exp.title,
                category: exp.category,
                recurrence: exp.recurrence,
                amount: exp.amount,
                deadline: exp.deadline,
            })),
        });
        console.log(
            "Expense list retrieved successfully:",
            service.map((exp) => ({ title: exp.title }))
        );
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error getList controller:", error);
    }
};

export const updatelistController = async (
    req: Request<{ id: string }, {}, ExpenselistBody>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const service = await updatelistService(req.user!._id, id, req.body);

        res.status(200).json({
            message: "Expense list updated successfully",
            data: {
                listId: service._id,
                title: service.title,
                category: service.category,
                recurrence: service.recurrence,
                amount: service.amount,
                deadline: service.deadline,
            },
        });

        console.log("Expense list pdated  successfully:", {
            userId: req.user!._id,
            listId: service._id,
            title: service.title,
        });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error updateList controller:", error);
    }
};

export const deletelistController = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const service = await deletelistService(req.user!._id, id);

        res.status(200).json({
            message: "Expense list deleted successfully",
            data: {
                listId: service._id,
                title: service.title,
            },
        });

        console.log("Expense list deleted successfully:", {
            listId: service._id,
            title: service.title,
        });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error deleteList controller:", error);
    }
};

export const getByIdController = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const service = await getByIdService(req.user!._id, id);

        res.status(200).json({
            message: "Expense list retrieved successfully",
            data: {
                listId: service._id,
                title: service.title,
            },
        });

        console.log("Expense list retrieved successfully:", {
            listId: service._id,
            title: service.title,
        });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error getById controller:", error);
    }
};

export const getTotalExpensesController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const total = await getTotalExpensesService(req.user!._id);
        res.json({ total });
        console.log("Total expenses retrieved successfully:", { total });
    } catch (error: any) {
        console.error("Error totalExpenses controller:", error);
        res.status(500).json({
            error: error.message || "Something went wrong",
        });
    }
};

export const getTotalByCategoryController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const status = req.params.status as "fixed" | "variable" | "optional";

        const total = await getTotalByCategoryService(req.user!._id, status);

        res.json({ total });
        console.log("Total by category retrieved successfully:", {
            category: status,
            total,
        });
    } catch (error: any) {
        console.log("Error totalExpense controller:", error);
        res.status(error.statusCode || 500).json({
            error: error.message || "Something went wrong. Please try again",
        });
    }
};

export const getTotalByRecurrenceController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const status = req.params.status as
            | "once"
            | "weekly"
            | "fortnight"
            | "monthly";

        const total = await getTotalByRecurrenceService(req.user!._id, status);

        res.json({ total });
        console.log("Total by recurrence retrieved successfully:", {
            recurrence: status,
            total,
        });
    } catch (error) {
        console.error("Error totalOnce controller:", error);
        res.status(500).json({ message: "Internal Error" });
    }
};
