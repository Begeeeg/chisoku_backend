import { Request, Response } from "express";
import { UserBody } from "../types/user.types";
import { getUser, updateUser, deleteUser } from "../service/user.service";

// Get user controller
export const getUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await getUser(req.user!._id);

        res.status(200).json({
            message: "User retrieved successfully",
            data: user,
        });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error getUser controller:", error);
    }
};

// Update user controller
export const updateUserController = async (
    req: Request<{}, {}, Partial<UserBody>>,
    res: Response
): Promise<void> => {
    try {
        const updatedUser = await updateUser(req.user!._id, req.body);

        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error updateUser controller:", error);
    }
};

// Delete user controller
export const deleteUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const deletedUser = await deleteUser(req.user!._id);

        res.status(200).json({
            message: "User deleted successfully",
            data: { userId: deletedUser._id, username: deletedUser.username },
        });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
        console.log("Error deleteUser controller:", error);
    }
};
