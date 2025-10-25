import express, { Router } from "express";
import { z } from "zod";
import { CartModel } from "../db/cart.js";
import { ProductModel } from "../db/product.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
export const cartRouter = Router();
// Get user's cart
cartRouter.get("/", userMiddleware, async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const cart = await CartModel.findOne({ userId: req.user.userId })
            .populate("items.productId");
        if (!cart) {
            return res.json({ items: [], total: 0, itemCount: 0 });
        }
        let total = 0;
        let itemCount = 0;
        for (const item of cart.items) {
            const product = item.productId;
            total += product.price * item.quantity;
            itemCount += item.quantity;
        }
        res.json({
            items: cart.items,
            total: Math.round(total * 100) / 100,
            itemCount
        });
    }
    catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
});
// Add item to cart
cartRouter.post("/add", userMiddleware, async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const { productId, quantity = 1, size, color } = req.body;
        // Validate product exists and is active
        const product = await ProductModel.findOne({
            _id: productId,
            isActive: true
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        // Check stock availability
        if (product.stock < quantity) {
            return res.status(400).json({
                error: `Insufficient stock. Available: ${product.stock}`
            });
        }
        // Get or create cart
        let cart = await CartModel.findOne({ userId: req.user.userId });
        if (!cart) {
            cart = await CartModel.create({
                userId: req.user.userId,
                items: []
            });
        }
        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId &&
            item.size === size &&
            item.color === color);
        if (existingItemIndex !== -1) {
            // Update quantity
            const existingItem = cart.items[existingItemIndex];
            if (!existingItem) {
                return res.status(400).json({ error: "Item not found" });
            }
            const newQuantity = existingItem.quantity + quantity;
            if (product.stock < newQuantity) {
                return res.status(400).json({
                    error: `Insufficient stock. Available: ${product.stock}`
                });
            }
            existingItem.quantity = newQuantity;
        }
        else {
            // Add new item
            cart.items.push({
                productId,
                quantity,
                size,
                color
            });
        }
        await cart.save();
        res.json({
            message: "Item added to cart successfully",
            cart
        });
    }
    catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ error: "Failed to add item to cart" });
    }
});
// Update item quantity in cart
cartRouter.put("/update", userMiddleware, async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const { productId, quantity, size, color } = req.body;
        if (quantity < 1) {
            return res.status(400).json({ error: "Quantity must be at least 1" });
        }
        const cart = await CartModel.findOne({ userId: req.user.userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        // Find item in cart
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId &&
            item.size === size &&
            item.color === color);
        if (itemIndex === -1) {
            return res.status(404).json({ error: "Item not found in cart" });
        }
        // Check stock availability
        const product = await ProductModel.findById(productId);
        if (!product || product.stock < quantity) {
            return res.status(400).json({
                error: `Insufficient stock. Available: ${product?.stock || 0}`
            });
        }
        const item = cart.items[itemIndex];
        if (!item) {
            return res.status(404).json({ error: "Item not found in cart" });
        }
        item.quantity = quantity;
        await cart.save();
        res.json({
            message: "Cart updated successfully",
            cart
        });
    }
    catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ error: "Failed to update cart" });
    }
});
// Remove item from cart
cartRouter.delete("/remove", userMiddleware, async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const { productId, size, color } = req.body;
        const cart = await CartModel.findOne({ userId: req.user.userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        // Remove item
        cart.items.pull({
            productId: productId,
            size: size,
            color: color
        });
        await cart.save();
        res.json({
            message: "Item removed from cart successfully",
            cart
        });
    }
    catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ error: "Failed to remove item from cart" });
    }
});
// Clear entire cart
cartRouter.delete("/clear", userMiddleware, async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        await CartModel.findOneAndDelete({ userId: req.user.userId });
        res.json({
            message: "Cart cleared successfully"
        });
    }
    catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ error: "Failed to clear cart" });
    }
});
//# sourceMappingURL=cart.js.map