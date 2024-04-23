"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/resetToken.ts
const mongoose_1 = require("mongoose");
const resetTokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});
const ResetToken = (0, mongoose_1.model)('ResetToken', resetTokenSchema);
exports.default = ResetToken;
