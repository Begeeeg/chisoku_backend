import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRoutes } from "./module/auth";
import { expenseRoutes } from "./module/expense";
import { userRouter } from "./module/user";

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/user", userRouter);

export default app;
