import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const userMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] ?? "";
        if (!authHeader) {
            return res.status(401).json({
                error: "Unauthorized: no token provided"
            });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "no token found!"
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded) {
            req.user = {
                userId: decoded.userId,
                role: decoded.role
            };
            next();
        }
    }
    catch (error) {
        console.error("JWT verification error:", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired!" });
        }
        else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token!" });
        }
        else {
            return res.status(401).json({ error: "Unauthorized: invalid token!" });
        }
    }
};
//# sourceMappingURL=userMiddleware.js.map