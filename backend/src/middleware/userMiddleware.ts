import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string

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

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
        if (decoded) {
            req.user = {
                userId: decoded.userId,
                role: decoded.role
            }
            next();
        }
    } catch (error: any) {
        console.error("JWT verification error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired!" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token!" });
        } else {
            return res.status(401).json({ error: "Unauthorized: invalid token!" });
        }
    }
}