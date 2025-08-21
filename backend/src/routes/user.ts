import { parse } from "dotenv";
import express, { Router } from "express"
import { z } from "zod"
import { UserModel } from "../db/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const userRouter: Router = Router();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET as string

const signupBody = z.object({
    username: z.email().min(3).max(30),
    password: z.string().min(3).max(10),
    firstName: z.string().max(30),
    lastName: z.string().max(30)
})

userRouter.post("/signup", async (req, res) => {
    const parsed = signupBody.safeParse(req.body);

    if (!parsed.success) {
        console.log(parsed.error);

        res.status(411).json({
            message: "email or password are too short",
            error: parsed.error.format()
        })
        return;
    }
    try {
        const existingUser = await UserModel.findOne({
            username: parsed.data.username
        })

        if (existingUser) {
            res.json({
                message: "User already exist with this email!"
            })
        }

        const hashedPassword = await bcrypt.hash(parsed.data.password, SALT_ROUNDS);

        const user = await UserModel.create({
            username: parsed.data.username,
            password: hashedPassword,
            firstName: parsed.data.firstName,
            lastName: parsed.data.lastName
        })

        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.status(201).json({
            message: "user created successfully",
            token
            // userId: user._id
        })

    } catch (e) {
        res.status(500).json({
            error: "something went wrong"
        })
    }
})

const loginBody = z.object({
    username: z.email().min(3).max(30),
    password: z.string().min(3).max(10),
})

userRouter.post("/signin", async (req, res) => {

    const parsed = loginBody.safeParse(req.body)
    if (!parsed.success) {
        res.status(411).json({
            error: "Incorrect credentials!!!"
        })
    }

    try {
        const { password } = req.body;
        const user = await UserModel.findOne({
            username: parsed.data?.username,
            password: parsed.data?.password
        })

        //@ts-ignore
        const isValidPass = await bcrypt.compare(password, user.password)
        if (!isValidPass) {
            res.status(401).json({
                error: "Incorrect password!"
            })
        }
        if (!user) {
            res.status(404).json({
                error: "User not found!"
            })
        }

        const token = jwt.sign({
            userId: user?._id
        }, JWT_SECRET)

        res.status(201).json({
            message: "Login succesfully!",
            token: token
        })
    } catch (e) {
        res.status(500).json({
            error: "Incorect email or server error!"
        })
    }
})