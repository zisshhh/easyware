import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    addres_line: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        type: Number
    },
    country: {
        type: String,
    },
    number: {
        type: Number,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        default: ""
    }
}, {
    timestamps: true
});
export const addresModel = mongoose.model("address", addressSchema);
//# sourceMappingURL=address.js.map