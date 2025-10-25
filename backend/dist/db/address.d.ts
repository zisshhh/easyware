import mongoose from "mongoose";
export declare const addresModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    number: number;
    userId: mongoose.Types.ObjectId;
    addres_line: string;
    city: string;
    state: string;
    status: boolean;
    pincode?: number | null;
    country?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    number: number;
    userId: mongoose.Types.ObjectId;
    addres_line: string;
    city: string;
    state: string;
    status: boolean;
    pincode?: number | null;
    country?: string | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    number: number;
    userId: mongoose.Types.ObjectId;
    addres_line: string;
    city: string;
    state: string;
    status: boolean;
    pincode?: number | null;
    country?: string | null;
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
    number: number;
    userId: mongoose.Types.ObjectId;
    addres_line: string;
    city: string;
    state: string;
    status: boolean;
    pincode?: number | null;
    country?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    number: number;
    userId: mongoose.Types.ObjectId;
    addres_line: string;
    city: string;
    state: string;
    status: boolean;
    pincode?: number | null;
    country?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    number: number;
    userId: mongoose.Types.ObjectId;
    addres_line: string;
    city: string;
    state: string;
    status: boolean;
    pincode?: number | null;
    country?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=address.d.ts.map