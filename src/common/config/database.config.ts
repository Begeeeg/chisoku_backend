import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        console.error("MONGO_URI is not properly defined");
        process.exit(1);
    }

    await mongoose.connect(mongoURI);
};

export default connectDB;
