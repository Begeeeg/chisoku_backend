import express from "express";
import {
    deleteUserController,
    getUserController,
    updateUserController,
} from "../controller/user.controller";
import { protectRoutes } from "../../../common/middleware/protectRoutes.middleware";

const router = express.Router();

router.get("/", protectRoutes, getUserController);
router.patch("/update/", protectRoutes, updateUserController);
router.delete("/delete/", protectRoutes, deleteUserController);

export default router;
