import express, { Router } from "express";
import { z } from "zod";
import { ProductModel } from "../db/product.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
export const productRouter = Router();
// Get all products with filtering, sorting, and pagination
productRouter.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 12, category, minPrice, maxPrice, brand, sortBy = "createdAt", sortOrder = "desc", search, isFeatured } = req.query;
        const query = { isActive: true };
        if (category)
            query.category = category;
        if (brand)
            query.brand = new RegExp(brand, "i");
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice)
                query.price.$gte = Number(minPrice);
            if (maxPrice)
                query.price.$lte = Number(maxPrice);
        }
        if (isFeatured)
            query.isFeatured = isFeatured === "true";
        if (search) {
            query.$text = { $search: search };
        }
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
        const products = await ProductModel.find(query)
            .sort(sortOptions)
            .limit(Number(limit) * 1)
            .skip((Number(page) - 1) * Number(limit))
            .populate("reviews.userId", "firstName lastName");
        const total = await ProductModel.countDocuments(query);
        res.json({
            products,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            total
        });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
// Get single product by ID
productRouter.get("/:id", async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
            .populate("reviews.userId", "firstName lastName");
        if (!product || !product.isActive) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to fetch product" });
    }
});
// Get featured products
productRouter.get("/featured/list", async (req, res) => {
    try {
        const products = await ProductModel.find({ isActive: true, isFeatured: true })
            .limit(8)
            .sort({ createdAt: -1 });
        res.json(products);
    }
    catch (error) {
        console.error("Error fetching featured products:", error);
        res.status(500).json({ error: "Failed to fetch featured products" });
    }
});
// Create product (Admin only)
productRouter.post("/", userMiddleware, adminMiddleware, async (req, res) => {
    try {
        const productData = req.body;
        const product = await ProductModel.create(productData);
        res.status(201).json({
            message: "Product created successfully",
            product
        });
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
});
// Update product (Admin only)
productRouter.put("/:id", userMiddleware, adminMiddleware, async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({
            message: "Product updated successfully",
            product
        });
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
});
// Delete product (Admin only)
productRouter.delete("/:id", userMiddleware, adminMiddleware, async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
});
// Add review to product
productRouter.post("/:id/reviews", userMiddleware, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        // Check if user already reviewed this product
        const existingReview = product.reviews.find(review => review.userId.toString() === req.user?.userId);
        if (existingReview) {
            return res.status(400).json({ error: "You have already reviewed this product" });
        }
        const review = {
            userId: req.user?.userId,
            rating,
            comment: comment || ""
        };
        product.reviews.push(review);
        // Update average rating
        const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
        product.rating.average = totalRating / product.reviews.length;
        product.rating.count = product.reviews.length;
        await product.save();
        res.status(201).json({
            message: "Review added successfully",
            review
        });
    }
    catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: "Failed to add review" });
    }
});
//# sourceMappingURL=product.js.map