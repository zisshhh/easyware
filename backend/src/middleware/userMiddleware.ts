import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface JwtPayload {
    userId: string,
    role: "user" | "admin"
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"] ?? "";
        if (!authHeader) {
            return res.status(401).json({
                error: "Unauthorized: no token provided"
            })
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "no token found!"
            })
        }
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded) {
            req.user = {
                //@ts-ignore
                userId: decoded.userId,
                //@ts-ignore
                role: decoded.role
            }
        }
    } catch (e) {
        console.error("Error is: ", e);
        res.status(500).json({
            error: "Unauthorized: invalid token!"
        })
    }
}