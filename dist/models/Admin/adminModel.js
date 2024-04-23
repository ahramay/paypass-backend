"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    name: {
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
}, { timestamps: true });
// Define a pre-save middleware to hash the password before saving
// AdminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   try {
//     const hashedPassword = await argon2.hash(this.password);
//     this.password = hashedPassword;
//     return next();
//   } catch (error: any) {
//     return next(error);
//   }
// });
const Admin = (0, mongoose_1.model)("Admin", AdminSchema);
exports.default = Admin;
