import express, { Router } from "express"
import { userRouter } from "./user.js";
import { productRouter } from "./product.js";
import { cartRouter } from "./cart.js";

export const rootRouter: Router = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/cart", cartRouter);