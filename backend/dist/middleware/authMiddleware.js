import jwt from "jsonwebtoken";
import { json } from "zod";
const JWT_SECRET = process.env.JWT_SECRET;
export const userMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"] ?? "";
    const token = authHeader.split(" ")[1];
    try {
        if (!token) {
            return res.status(401), json({
                message: "no token found!"
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded) {
            // @ts-ignore
            req.userId = decoded.userId;
            next();
        }
    }
    catch (e) {
        console.error("Error is: ", e);
        res.status(500).json({
            error: "Unauthorized or invalid token!"
        });
    }
};
//# sourceMappingURL=authMiddleware.js.map