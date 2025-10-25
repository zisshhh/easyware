import mongoose from "mongoose";
export declare const CategoryModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    slug: string;
    image: string;
    parentCategory: mongoose.Types.ObjectId;
    isActive: boolean;
    sortOrder: number;
    description?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    slug: string;
    image: string;
    parentCategory: mongoose.Types.ObjectId;
    isActive: boolean;
    sortOrder: number;
    description?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    slug: string;
    image: string;
    parentCategory: mongoose.Types.ObjectId;
    isActive: boolean;
    sortOrder: number;
    description?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
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
    slug: string;
    image: string;
    parentCategory: mongoose.Types.ObjectId;
    isActive: boolean;
    sortOrder: number;
    description?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    slug: string;
    image: string;
    parentCategory: mongoose.Types.ObjectId;
    isActive: boolean;
    sortOrder: number;
    description?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    slug: string;
    image: string;
    parentCategory: mongoose.Types.ObjectId;
    isActive: boolean;
    sortOrder: number;
    description?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=category.d.ts.map