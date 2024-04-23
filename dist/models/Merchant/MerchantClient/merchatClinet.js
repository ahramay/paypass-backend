"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const argon2_1 = __importDefault(require("argon2"));
const merchatClinetSchema = new mongoose_1.default.Schema({
    merchant: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Merchant',
        required: false
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['staff'],
        default: 'staff'
    }
}, { timestamps: true });
// Define a pre-save middleware to hash the password before saving
merchatClinetSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        try {
            const hashedPassword = yield argon2_1.default.hash(this.password);
            this.password = hashedPassword;
            return next();
        }
        catch (error) {
            return next(error);
        }
    });
});
const MerchatClinet = mongoose_1.default.model("MerchatClinet", merchatClinetSchema);
exports.default = MerchatClinet;
