import type { NextFunction, Request, Response } from "express";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.user && req.user.role ==="admin"){
        next();
    } else {
        return res.status(403).json({
            error: "Admin only!"
        })
    }
}