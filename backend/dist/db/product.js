import mongoose, { Schema } from "mongoose";
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ["men", "women", "accessories", "electronics", "home", "sports"]
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    images: [{
            type: String,
            required: true
        }],
    sizes: [{
            type: String,
            enum: ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40", "42"]
        }],
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
}, {
    timestamps: true
});
export const ProductModel = mongoose.model("Product", productSchema);
//# sourceMappingURL=product.js.map