import { Request, Response } from "express";

export const createlistController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
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
