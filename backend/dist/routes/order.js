import express, { Router } from "express";
import { z } from "zod";
import { OrderModel } from "../db/order.js";
import { CartModel } from "../db/cart.js";
import { ProductModel } from "../db/product.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
export const orderRouter = Router();
// Create order from cart
orderRouter.post("/", userMiddleware, async (req, res) => {
    try {
        const { shippingAddress, billingAddress, paymentMethod } = req.body;
        // Get user's cart
        const cart = await CartModel.findOne({ userId: req.user?.userId })
            .populate("items.productId");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }
        // Calculate totals
        let subtotal = 0;
        const orderItems = [];
        for (const item of cart.items) {
            const product = item.productId;
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
            orderItems.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price,
                size: item.size,
                color: item.color
            });
            // Check stock availability
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    error: `Insufficient stock for ${product.name}. Available: ${product.stock}`
                });
            }
        }
        // Calculate shipping and tax (simplified)
        const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + shippingCost + tax;
        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        // Create order
        const order = await OrderModel.create({
            userId: req.user?.userId,
            orderNumber,
            items: orderItems,
            shippingAddress,
            billingAddress,
            subtotal,
            shippingCost,
            tax,
            total,
            paymentMethod
        });
        // Update product stock
        for (const item of cart.items) {
            const product = item.productId;
            await ProductModel.findByIdAndUpdate(product._id, { $inc: { stock: -item.quantity } });
        }
        // Clear cart
        await CartModel.findOneAndDelete({ userId: req.user?.userId });
        res.status(201).json({
            message: "Order created successfully",
            order
        });
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
});
// Get user's orders
orderRouter.get("/my-orders", userMiddleware, async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const query = { userId: req.user?.userId };
        if (status)
            query.status = status;
        const orders = await OrderModel.find(query)
            .populate("items.productId", "name images price")
            .sort({ createdAt: -1 })
            .limit(Number(limit) * 1)
            .skip((Number(page) - 1) * Number(limit));
        const total = await OrderModel.countDocuments(query);
        res.json({
            orders,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            total
        });
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});
// Get single order
orderRouter.get("/:id", userMiddleware, async (req, res) => {
    try {
        const order = await OrderModel.findOne({
            _id: req.params.id,
            userId: req.user?.userId
        }).populate("items.productId");
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    }
    catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ error: "Failed to fetch order" });
    }
});
// Update order status (Admin only)
orderRouter.patch("/:id/status", userMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { status, trackingNumber } = req.body;
        const order = await OrderModel.findByIdAndUpdate(req.params.id, {
            status,
            ...(trackingNumber && { trackingNumber })
        }, { new: true }).populate("items.productId");
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json({
            message: "Order status updated successfully",
            order
        });
    }
    catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: "Failed to update order status" });
    }
});
// Get all orders (Admin only)
orderRouter.get("/admin/all", userMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { page = 1, limit = 20, status, paymentStatus } = req.query;
        const query = {};
        if (status)
            query.status = status;
        if (paymentStatus)
            query.paymentStatus = paymentStatus;
        const orders = await OrderModel.find(query)
            .populate("userId", "firstName lastName email")
            .populate("items.productId", "name images")
            .sort({ createdAt: -1 })
            .limit(Number(limit) * 1)
            .skip((Number(page) - 1) * Number(limit));
        const total = await OrderModel.countDocuments(query);
        res.json({
            orders,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            total
        });
    }
    catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});
// Get order statistics (Admin only)
orderRouter.get("/admin/stats", userMiddleware, adminMiddleware, async (req, res) => {
    try {
        const totalOrders = await OrderModel.countDocuments();
        const pendingOrders = await OrderModel.countDocuments({ status: "pending" });
        const totalRevenue = await OrderModel.aggregate([
            { $match: { status: { $ne: "cancelled" } } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);
        const monthlyRevenue = await OrderModel.aggregate([
            {
                $match: {
                    status: { $ne: "cancelled" },
                    createdAt: {
                        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                    }
                }
            },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);
        res.json({
            totalOrders,
            pendingOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
            monthlyRevenue: monthlyRevenue[0]?.total || 0
        });
    }
    catch (error) {
        console.error("Error fetching order statistics:", error);
        res.status(500).json({ error: "Failed to fetch order statistics" });
    }
});
//# sourceMappingURL=order.js.map