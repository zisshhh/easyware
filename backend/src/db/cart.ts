import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product"
    },
    quantity: {
        type: Number,
        default: 1
    }

}, {
    timestamps: true
});

export const CartModel = mongoose.model("cartProdct", cartSchema);
