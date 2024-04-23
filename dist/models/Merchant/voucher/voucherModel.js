"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const voucherSchema = new mongoose_1.default.Schema({
    merchant: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    customFields: {
        type: mongoose_1.default.Schema.Types.Mixed, // Accept any type for custom fields
    },
}, { timestamps: true });
const Voucher = mongoose_1.default.model("voucher", voucherSchema);
exports.default = Voucher;
