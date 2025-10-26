import express, { Router } from "express"
import { userRouter } from "./user.js";
import { productRouter } from "./product.js";

export const rootRouter: Router = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/products", productRouter);