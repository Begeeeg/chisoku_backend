import type { Request, Response, NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../module/user/model/User.model";

export const protectRoutes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    interface TokenPayload extends JwtPayload {
        userId: string;
    }

    try {
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as TokenPayload;
        if (!decoded) {
            return res.status(401).json({ message: "Token invalid" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoutes:", error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
