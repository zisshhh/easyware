import express, { Router } from "express";
import { userRouter } from "./user.js";
export const rootRouter = express.Router();
rootRouter.use("/user", userRouter);
//# sourceMappingURL=index.js.map