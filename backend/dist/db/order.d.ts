import mongoose from "mongoose";
export declare const OrderModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    orderId: string;
    paymentId: string;
    subTotalAmt: number;
    totalAmt: number;
    productsDetail?: string | null;
    paymentStatus?: boolean | null;
    deliveryAddress?: mongoose.Types.ObjectId | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    orderId: string;
    paymentId: string;
    subTotalAmt: number;
    totalAmt: number;
    productsDetail?: string | null;
    paymentStatus?: boolean | null;
    deliveryAddress?: mongoose.Types.ObjectId | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    orderId: string;
    paymentId: string;
    subTotalAmt: number;
    totalAmt: number;
    productsDetail?: string | null;
    paymentStatus?: boolean | null;
    deliveryAddress?: mongoose.Types.ObjectId | null;
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
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    orderId: string;
    paymentId: string;
    subTotalAmt: number;
    totalAmt: number;
    productsDetail?: string | null;
    paymentStatus?: boolean | null;
    deliveryAddress?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    orderId: string;
    paymentId: string;
    subTotalAmt: number;
    totalAmt: number;
    productsDetail?: string | null;
    paymentStatus?: boolean | null;
    deliveryAddress?: mongoose.Types.ObjectId | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    orderId: string;
    paymentId: string;
    subTotalAmt: number;
    totalAmt: number;
    productsDetail?: string | null;
    paymentStatus?: boolean | null;
    deliveryAddress?: mongoose.Types.ObjectId | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=order.d.ts.map