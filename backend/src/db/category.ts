import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        maxLength: 500
    },
    image: {
        type: String,
        required: true
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    sortOrder: {
        type: Number,
        default: 0
    },
    metaTitle: String,
    metaDescription: String
}, {
    timestamps: true
});

// Index for better performance
categorySchema.index({ slug: 1 });
categorySchema.index({ parentCategory: 1, isActive: 1 });

export const CategoryModel = mongoose.model("Category", categorySchema);
