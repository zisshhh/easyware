import { Router } from "express";
import { productBody, updateProductBody } from "../schema/products.js";
import { ProductModel } from "../db/product.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { userMiddleware } from "../middleware/userMiddleware.js";

export const productRouter: Router = Router();

//createProduct admin only
productRouter.post("/", userMiddleware, adminMiddleware, async (req, res) => {
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

//getAllProducts
productRouter.get("/", userMiddleware, async (req, res) => {
    try {
        const product = await ProductModel.find({});
        if (!product) {
            return res.status(404).json({
                message: "No product found"
            })
        }
        res.status(200).json({
            allProducts: product
        })
    } catch (e) {
        console.log("Server error", e);
        res.status(500).json({ e: 'Server error!' });
    }
})

//products/:id
productRouter.get("/:id", userMiddleware, async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "This specific products is not found!"
            })
        }
        res.status(200).json({
            product,
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        console.log(error);
    }
})

//update productd adminOnly!
productRouter.put("/:id", userMiddleware, adminMiddleware, async (req, res) => {
    const parsed = updateProductBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(411).json({
            eroro: "validation error!"
        })
    }
    const { name, price, brand, description, category, imageURL } = parsed.data;

    try {
        const product = await ProductModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                message: "Products not found!"
            })
        }

        if (name) product.name = name;
        if (price) product.price = price;
        if (brand) product.brand = brand;
        if (description) product.description = description;
        if (category) product.category = category;
        if (imageURL) product.imageURL = imageURL;

        await product.save();
        res.status(200).json({ message: "Product updated successfully!", product });
    } catch (error) {
        console.log("Server error:", error);
        res.status(500).json({ error: "Server error occurred" });
    }
})

//delete products adminOnly!
productRouter.delete("/:id", userMiddleware, adminMiddleware, async (req, res) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Proudcts not found or something!"
            })
        }
        res.status(200).json({
            message: "Product delete successfully!"
        })
    } catch (error) {
        console.log("server error", error),
        res.status(500).json({ error: "Server error" })
    }
})