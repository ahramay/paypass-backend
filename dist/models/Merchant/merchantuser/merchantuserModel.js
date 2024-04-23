"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const merchantUserSchema = new mongoose_1.default.Schema({
    merchant: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    number: {
        type: String,
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        enum: ["unpaid", "paid", "failed", "expired"],
        default: "unpaid",
    },
    role: {
        type: String
    }
}, { timestamps: true });
const merchantUser = mongoose_1.default.model("merchantUser", merchantUserSchema);
exports.default = merchantUser;
