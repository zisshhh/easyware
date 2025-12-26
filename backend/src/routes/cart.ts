import { Router } from "express";
import { addToCartBody, updateCartBody } from "../schema/cart.js";
import { CartModel } from "../db/cart.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { ProductModel } from "../db/product.js";

export const cartRouter: Router = Router();

//addToCart
cartRouter.post("/", userMiddleware, async (req, res) => {
    const userId = req.user.userId
    const parsed = addToCartBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(404).json({
            error: "Product not found"
        });
    }
    try {
        const alredyInCart = await CartModel.findOne({
            userId,
            productId: parsed.data.productId
        })
        if (alredyInCart) {
            alredyInCart.quantity += parsed.data.quantity
            await alredyInCart.save();
            return res.status(200).json({
                message: "Cart updated",
                cart: alredyInCart
            });
        }

        const newItem = await CartModel.create({
            userId,
            productId: parsed.data.productId,
            quantity: parsed.data.quantity
        })
        res.status(201).json({
            message: "Added to cart",
            cart: newItem
        })

    } catch (e) {
        console.log("Server error", e);
        res.status(500).json({ error: "Server error", e });
    }
})

//getCart and Totoal of price
cartRouter.get("/", userMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;

        const cartItem = await CartModel.find({ userId })
            .populate("productId", "name price imageURL brand category")
            .lean();

        if (!cartItem.length)
            return res.status(200).json({
                items: [],
                totalPrice: 0
            })

        let totalPrice = 0;
        const itmesWithSubtotal = cartItem.map((item) => {
            const price = (item.productId as any)?.price ?? 0;
            const quantity = item.quantity ?? 0;
            const subtotal = price * quantity;
            totalPrice += subtotal

            return {
                ...item,
                subtotal
            }
        })

        return res.status(200).json({
            items: itmesWithSubtotal,
            totalPrice
        })
    } catch (e) {
        console.log("Server error", e);
        res.status(500).json({ error: "Server error", e });
    }
})

//update cart, it'll update the whole quantity not add or sub from quantity
cartRouter.put("/:id", userMiddleware, async (req, res) => {
    const parsed = updateCartBody.safeParse(req.body);
    const { id } = req.params;

    if (!parsed.success) {
        return res.status(411).json({
            error: "Validation error"
        })
    }

    const quantity = parsed.data.quantity;

    try {
        const userId = req.user.userId;
        const cartItem = await CartModel.findOne({
            _id: id,
            userId
        })
        if (!cartItem) return res.status(404).json({ error: "Item not found" });

        const product = await ProductModel.findById(cartItem.productId)
        if (quantity !== undefined) {
            cartItem.quantity = quantity;
        }

        await cartItem.save();
        return res.status(200).json({
            message: "Cart updated",
            cart: cartItem
        })

    } catch (e) {
        console.log("Server error", e),
            res.status(500).json({ error: "Server error", e });
    }
})

//decrease by 1
cartRouter.patch("/:id/decrease", userMiddleware, async (req, res) => {
    try {
        const { id } = req.params

        const cartItem = await CartModel.findById(id);
        if (!cartItem) return res.status(404).json({ message: "Cart item not found!" })

        cartItem.quantity -= 1;

        if (cartItem.quantity <= 0) {
            await CartModel.findByIdAndDelete(id);
            return res.status(201).json({ message: "Item removed from cart!" });
        }

        await cartItem.save();

        res.status(201).json({
            message: "Quantity decresed by 1",
            updatedItem: cartItem
        })
    } catch (e) {
        console.log("Server error ", e);
        res.status(500).json({ message: "Failed to decrease quantity", e });
    }
})

//increase by 1
cartRouter.patch("/:id/increase", userMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const cartItem = await CartModel.findById(id);
        if (!cartItem) return res.status(404).json({ message: "Cart item not found!" })

        cartItem.quantity += 1;
        await cartItem.save();

        res.status(201).json({
            message: "Quantity increase by 1",
            updatedItem: cartItem
        })

    } catch (e) {
        console.log("Server error ", e);
        res.status(500).json({ message: "Failed to decrease quantity", e });
    }
})

//remove from cart
cartRouter.delete("/:id", userMiddleware, async (req, res) => {
    try {
        const deletItem = await CartModel.deleteOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (deletItem.deletedCount === 0) {
            return res.status(404).json({ error: "Item not found!" })
        }
        res.status(200).json({ message: "Item deleted!" })
    } catch (e) {
        console.log("Server error", e);
        res.status(500).json({ error: "Server error", e })
    }
})

//clear cart
cartRouter.delete("/", userMiddleware, async (req, res) => {
    try {
        const deleted = await CartModel.deleteMany({ userId: req.user.userId });
        if (!deleted) {
            return res.status(404).json({
                message: "No product found!"
            })
        }
        res.status(200).json({ message: "Cart cleared!" })
    } catch (e) {
        console.log("Server error", e);
        res.status(500).json({ error: "Server error", e })
    }
})