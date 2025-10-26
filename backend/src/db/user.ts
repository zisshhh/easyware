import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Provide email"],
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: [true, "Provide password"],
        minLength: 6
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 30
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 30
    },

}, {
    timestamps: true,
})

export const UserModel = mongoose.model("user", userSchema);