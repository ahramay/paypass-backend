"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const voucherSchema = new mongoose_1.default.Schema({
    // merchant:{
    //   type:mongoose.Schema.Types.ObjectId,
    //   required:true
    // },
    ChallanNo: {
        type: String,
    },
    RollNo: {
        type: String,
    },
    department: {
        type: String,
    },
    FeeType: {
        type: String,
    },
    Name: {
        type: String,
    },
    FatherName: {
        type: String,
    },
    Total: {
        type: String,
    }
}, { timestamps: true });
const VoucherFields = mongoose_1.default.model("VoucherFields", voucherSchema);
exports.default = VoucherFields;
