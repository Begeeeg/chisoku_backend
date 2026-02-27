import { Request, Response } from "express";

import { generateTokenandSetCookie } from "../../../common/utils/generateTokenandSetCookie";
import { loginService, signupService } from "../service/auth.service";
import { LoginBody, SignupBody } from "../types/auth.types";

export const signupController = async (
    req: Request<{}, {}, SignupBody>,
    res: Response
): Promise<void> => {
    try {
        const service = await signupService(req.body);

        generateTokenandSetCookie(res, service._id.toString());

        res.status(201).json({
            message: "User registered successfully",
            data: {
                userId: service._id.toString(),
                username: service.username,
            },
        });
        console.log("User registered successfully:", {
            userId: service._id.toString(),
            username: service.username,
        });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error signUp controller:", error);
    }
};

export const loginController = async (
    req: Request<{}, {}, LoginBody>,
    res: Response
): Promise<void> => {
    try {
        const service = await loginService(req.body);

        generateTokenandSetCookie(res, service._id.toString());

        res.status(201).json({
            message: "User log in successfully",
            data: {
                userId: service._id.toString(),
                username: service.username,
            },
        });
        console.log("User log in successfully:", {
            userId: service._id.toString(),
            username: service.username,
        });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error signIn controller:", error);
    }
};

export const logoutController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const hasToken = Boolean(req.cookies?.jwt);

        res.clearCookie("jwt");

        res.status(200).json({
            message: hasToken
                ? "User signed out successfully"
                : "No user signed in",
        });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error signOut controller:", error);
    }
};
