import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000
    },
    category: {
        type: String,
        required: true,
    },
    imageURL: [{
        type: String,
        required: true
    }],
}, {
    timestamps: true
});

export const ProductModel = mongoose.model("product", productSchema);
