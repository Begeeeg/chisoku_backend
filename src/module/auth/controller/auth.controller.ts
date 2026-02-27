import { Request, Response } from "express";
import { signUpService } from "../service/auth.service";

export const signIn = async (req: Request, res: Response): Promise<void> => {
    try {
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Erro signIn controller:", error);
    }
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await signUpService(req.body);

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Erro signUp controller:", error);
    }
};

export const signOut = async (req: Request, res: Response): Promise<void> => {
    try {
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Erro signOut controller:", error);
    }
};
