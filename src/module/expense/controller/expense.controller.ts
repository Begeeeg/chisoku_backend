import { Request, Response } from "express";
import { ExpenselistBody } from "../types/expense.types";
import { createlistService } from "../service/expense.service";

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
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error getList controller:", error);
    }
};

export const updatelistController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error updateList controller:", error);
    }
};

export const deletelistController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error deleteList controller:", error);
    }
};
