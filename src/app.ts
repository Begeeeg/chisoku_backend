import express from "express";
import cookieParser from "cookie-parser";
import { authRoutes } from "./module/auth";
import { expenseRoutes } from "./module/expense";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

export default app;
