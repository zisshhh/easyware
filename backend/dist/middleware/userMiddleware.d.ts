import type { Request, Response, NextFunction } from "express";
export interface JwtPayload {
    userId: string;
    role: "user" | "admin";
}
export declare const userMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=userMiddleware.d.ts.map