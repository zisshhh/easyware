import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const MONGO_URL = process.env.MONGO_URL as string;
mongoose.connect(MONGO_URL)
    .then(() => console.log("Mongoo conected"))
    .catch((error) => console.error("Mongo connection error", error))

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        maxLenth: 30
    },
    lastName: {
        type: String,
        required: true,
        maxLenth: 30
    }
})

export const UserModel = mongoose.model("User", userSchema)