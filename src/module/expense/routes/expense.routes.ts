import express from "express";
import { protectRoutes } from "../../../common/middleware/protectRoutes.middleware";
import {
    createlistController,
    deletelistController,
    getlistController,
    getTotalByCategoryController,
    getTotalByRecurrenceController,
    getTotalExpensesController,
    updatelistController,
} from "../controller/expense.controller";

const router = express.Router();

router.post("/create", protectRoutes, createlistController);
router.get("/", protectRoutes, getlistController);
router.patch("/update/:id", protectRoutes, updatelistController);
router.delete("/delete/:id", protectRoutes, deletelistController);
router.get("/total", protectRoutes, getTotalExpensesController);
router.get(
    "/total/category/:status",
    protectRoutes,
    getTotalByCategoryController
);
router.get(
    "/total/recurrence/:status",
    protectRoutes,
    getTotalByRecurrenceController
);

export default router;
