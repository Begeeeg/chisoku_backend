import express from "express";
import dotenv from "dotenv";
import connectDB from "./common/config/database.config";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
