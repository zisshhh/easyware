import mongoose from "mongoose";
export declare const UserModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: "user" | "admin";
    firstName: string;
    lastName: string;
    addresDetail: mongoose.Types.ObjectId[];
    shopingCart: mongoose.Types.ObjectId[];
    orderHistory: mongoose.Types.ObjectId[];
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: "user" | "admin";
    firstName: string;
    lastName: string;
    addresDetail: mongoose.Types.ObjectId[];
    shopingCart: mongoose.Types.ObjectId[];
    orderHistory: mongoose.Types.ObjectId[];
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: "user" | "admin";
    firstName: string;
    lastName: string;
    addresDetail: mongoose.Types.ObjectId[];
    shopingCart: mongoose.Types.ObjectId[];
    orderHistory: mongoose.Types.ObjectId[];
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
    email: string;
    password: string;
    role: "user" | "admin";
    firstName: string;
    lastName: string;
    addresDetail: mongoose.Types.ObjectId[];
    shopingCart: mongoose.Types.ObjectId[];
    orderHistory: mongoose.Types.ObjectId[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: "user" | "admin";
    firstName: string;
    lastName: string;
    addresDetail: mongoose.Types.ObjectId[];
    shopingCart: mongoose.Types.ObjectId[];
    orderHistory: mongoose.Types.ObjectId[];
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: "user" | "admin";
    firstName: string;
    lastName: string;
    addresDetail: mongoose.Types.ObjectId[];
    shopingCart: mongoose.Types.ObjectId[];
    orderHistory: mongoose.Types.ObjectId[];
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=user.d.ts.map