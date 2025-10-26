import { Router } from "express";
import { productBody } from "../schema/products.js";
import { ProductModel } from "../db/product.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { userMiddleware } from "../middleware/userMiddleware.js";


export const productRouter: Router = Router();

//createProduct admin only
productRouter.post("/",userMiddleware, adminMiddleware, async (req, res) => {
    const parsed = productBody.safeParse(req.body);
    if (!parsed.success) {
        console.log(parsed.error);
        res.status(411).json({
            message: "Error while parsing",
            error: parsed.error.format()
        })
        return;
    }

    try {
        const product = await ProductModel.create({
            name: parsed.data.name,
            price: parsed.data.price,
            brand: parsed.data.brand,
            description: parsed.data.description,
            category: parsed.data.category,
            imageURL: parsed.data.imageURL
        })

        res.status(201).json({
            message: "product created succesfully!",
            product
        })
    } catch (error) {
        console.log("server error: ", error)
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }

})