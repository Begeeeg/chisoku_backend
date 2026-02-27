import { Request, Response } from "express";
import { signUpService } from "../service/auth.service";
import { generateTokenandSetCookie } from "../../../common/utils/generateTokenandSetCookie";

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

        generateTokenandSetCookie(res, user._id.toString());

        res.status(201).json({
            message: "User registered successfully",
            data: {
                userId: user._id.toString(),
                username: user.username,
            },
        });
        console.log("User registered successfully:", user);
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
