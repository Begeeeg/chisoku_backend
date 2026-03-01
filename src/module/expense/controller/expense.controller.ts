import { Request, Response } from "express";
import { ExpenselistBody } from "../types/expense.types";
import {
    createlistService,
    deletelistService,
    getlistService,
    updatelistService,
} from "../service/expense.service";
import { listen } from "node:quic";

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
                title: service.title,
            },
        });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error deleteList controller:", error);
    }
};
