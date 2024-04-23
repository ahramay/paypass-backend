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
const mongoose_1 = require("mongoose");
const argon2_1 = __importDefault(require("argon2"));
const userSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    organizationName: {
        type: String,
    },
    cnic: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
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
    role: {
        type: String,
        enum: ['SuperAdmin', 'admin', 'staff', 'User'],
        default: 'User'
    },
    stepCount: {
        type: Number,
        default: 0,
    },
    profileCompeleted: {
        type: String,
        default: "0%",
    },
    status: {
        type: String,
        // enum:['onboarding','pending','approved'],
        enum: ['active', 'pending', 'onboarding', 'blocked', 'rejected',],
        default: 'onboarding'
    }
}, { timestamps: true });
// Define a pre-save middleware to hash the password before saving
userSchema.pre("save", function (next) {
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
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
