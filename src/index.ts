import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./common/config/database.config";
import { authRoutes } from "./module/auth";
import { expenseRoutes } from "./module/expense";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
