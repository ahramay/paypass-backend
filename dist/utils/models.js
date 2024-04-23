"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExacelUpload = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ExacelUploadSchema = new Schema({
    merchant: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    voucherId: {
        type: Number,
        // required:true,
    },
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
    DueDate: {
        type: String,
    },
    FatherName: {
        type: String,
    },
    Total: {
        type: String,
    },
    status: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid",
    },
}, { strict: false, timestamps: true });
exports.ExacelUpload = mongoose_1.default.model("ExacelUpload", ExacelUploadSchema);
