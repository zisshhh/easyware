import { parse } from "dotenv";
import express, { Router } from "express";
import { email, z } from "zod";
import { UserModel } from "../db/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { isValid } from "zod/v3";
dotenv.config();
export const userRouter = Router();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const signupBody = z.object({
    email: z.email().min(6).max(50),
    password: z.string().min(6).max(50),
    firstName: z.string().max(30),
    lastName: z.string().max(30),
    adminKey: z.string().optional()
});
//signup
userRouter.post("/signup", async (req, res) => {
    const parsed = signupBody.safeParse(req.body);
    if (!parsed.success) {
        console.log(parsed.error);
        res.status(411).json({
            message: "email or password are too short",
            error: parsed.error.format
        });
        return;
    }
    try {
        const existingUser = await UserModel.findOne({
            email: parsed.data.email
        });
        if (existingUser) {
            return res.json({
                message: "User already exist with this email!"
            });
        }
        const hashedPassword = await bcrypt.hash(parsed.data.password, SALT_ROUNDS);
        let role = "user";
        if (parsed.data.adminKey && parsed.data.adminKey === process.env.ADMIN_KEY) {
            role = "admin";
        }
        const user = await UserModel.create({
            email: parsed.data.email,
            password: hashedPassword,
            firstName: parsed.data.firstName,
            lastName: parsed.data.lastName,
            role
        });
        const token = jwt.sign({
            userId: user._id.toString(),
            role: user.role
        }, JWT_SECRET);
        res.status(201).json({
            message: "user created successfully",
            token,
            user
        });
    }
    catch (e) {
        console.log("signup error" + e);
        res.status(500).json({
            error: "something went wrong",
        });
    }
});
const loginBody = z.object({
    email: z.email().min(3).max(30),
    password: z.string().min(3).max(10),
});
//login
userRouter.post("/signin", async (req, res) => {
    const parsed = loginBody.safeParse(req.body);
    if (!parsed.success) {
        res.status(411).json({
            error: "Incorrect credentials!!!"
        });
    }
    try {
        const user = await UserModel.findOne({
            email: parsed.data?.email
        });
        if (!user) {
            res.status(404).json({
                error: "User not found!"
            });
        }
        const password = parsed.data?.password;
        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) {
            res.status(401).json({
                error: "Incorrect password!"
            });
        }
        const token = jwt.sign({
            userId: user?._id.toString(),
            role: user?.role
        }, JWT_SECRET);
        res.status(200).json({
            message: "Login succesfully!",
            user: {
                email: user?.email,
                firstName: user?.firstName,
                lastName: user?.lastName
            },
            token: token,
            role: user?.role
        });
    }
    catch (e) {
        console.error("Error is: ", e);
        res.status(500).json({
            error: "Server error!"
        });
    }
});
const updateBody = z.object({
    email: z.email().optional(),
    currentPassword: z.string().min(6).optional(),
    newPassword: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
});
//update
userRouter.put("/", userMiddleware, async (req, res) => {
    const parsed = updateBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(411).json({
            error: "Validation error!"
        });
    }
    const { email, currentPassword, newPassword, firstName, lastName } = parsed.data;
    try {
        const user = await UserModel.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({
                error: "User not found!"
            });
        }
        if (!currentPassword) {
            return res.status(411).json({
                message: "Current password is required!"
            });
        }
        const isValidPass = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPass) {
            return res.status(411).json({
                message: "Incorrect Passoword!"
            });
        }
        if (email)
            user.email = email;
        if (firstName)
            user.firstName = firstName;
        if (lastName)
            user.lastName = lastName;
        if (newPassword) {
            const hashPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
            user.password = hashPassword;
        }
        await user.save();
        return res.status(200).json({
            message: "User updated succesfully!",
            user
        });
    }
    catch (error) {
        console.log("Update user error" + error);
        return res.status(500).json({
            error: "Internal server error!"
        });
    }
});
//# sourceMappingURL=user.js.map