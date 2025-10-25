import mongoose from "mongoose";
export declare const CartModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    quantity: number;
    userId?: mongoose.Types.ObjectId | null;
    productId?: mongoose.Types.ObjectId | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    quantity: number;
    userId?: mongoose.Types.ObjectId | null;
    productId?: mongoose.Types.ObjectId | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    quantity: number;
    userId?: mongoose.Types.ObjectId | null;
    productId?: mongoose.Types.ObjectId | null;
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
    quantity: number;
    userId?: mongoose.Types.ObjectId | null;
    productId?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    quantity: number;
    userId?: mongoose.Types.ObjectId | null;
    productId?: mongoose.Types.ObjectId | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    quantity: number;
    userId?: mongoose.Types.ObjectId | null;
    productId?: mongoose.Types.ObjectId | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=cart.d.ts.map