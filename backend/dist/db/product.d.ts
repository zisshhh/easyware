import mongoose from "mongoose";
export declare const ProductModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    price: number;
    category: "men" | "women" | "accessories" | "electronics" | "home" | "sports";
    brand: string;
    images: string[];
    sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL" | "28" | "30" | "32" | "34" | "36" | "38" | "40" | "42")[];
    stock: number;
    originalPrice?: number | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    price: number;
    category: "men" | "women" | "accessories" | "electronics" | "home" | "sports";
    brand: string;
    images: string[];
    sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL" | "28" | "30" | "32" | "34" | "36" | "38" | "40" | "42")[];
    stock: number;
    originalPrice?: number | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    price: number;
    category: "men" | "women" | "accessories" | "electronics" | "home" | "sports";
    brand: string;
    images: string[];
    sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL" | "28" | "30" | "32" | "34" | "36" | "38" | "40" | "42")[];
    stock: number;
    originalPrice?: number | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    price: number;
    category: "men" | "women" | "accessories" | "electronics" | "home" | "sports";
    brand: string;
    images: string[];
    sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL" | "28" | "30" | "32" | "34" | "36" | "38" | "40" | "42")[];
    stock: number;
    originalPrice?: number | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    price: number;
    category: "men" | "women" | "accessories" | "electronics" | "home" | "sports";
    brand: string;
    images: string[];
    sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL" | "28" | "30" | "32" | "34" | "36" | "38" | "40" | "42")[];
    stock: number;
    originalPrice?: number | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    price: number;
    category: "men" | "women" | "accessories" | "electronics" | "home" | "sports";
    brand: string;
    images: string[];
    sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL" | "28" | "30" | "32" | "34" | "36" | "38" | "40" | "42")[];
    stock: number;
    originalPrice?: number | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=product.d.ts.map