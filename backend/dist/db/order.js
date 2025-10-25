import mongoose, { Schema } from "mongoose";
const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: String,
        required: [true, "Provide orderId"],
        unique: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true
    },
    productsDetail: {
        type: String,
        image: Array
    },
    paymentId: {
        type: String,
        default: ""
    },
    paymentStatus: {
        type: Boolean,
        image: Array
    },
    deliveryAddress: {
        type: mongoose.Schema.ObjectId,
        ref: "address"
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});
export const OrderModel = mongoose.model("order", orderSchema);
//# sourceMappingURL=order.js.map