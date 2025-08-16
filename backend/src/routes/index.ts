import express, { Router } from "express"
import { userRouter } from "./user.js";

export const rootRouter: Router = express.Router();

rootRouter.use("/user", userRouter);