import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const MONGO_URL = process.env.MONGO_URL!

if(!MONGO_URL){
    throw new Error("MONGO_URL not found!")
}

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Mongoo connected!!!");
    } catch (e) {
        console.error("Mongoo error:" + e);
        process.exit(1);
    }
}