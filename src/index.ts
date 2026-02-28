import dotenv from "dotenv";
import connectDB from "./common/config/database.config";
import app from "./app";

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
