"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepFourSchema = void 0;
const mongoose_1 = require("mongoose");
exports.StepFourSchema = new mongoose_1.Schema({
    bankName: String,
    accountTitle: String,
    accountNumber: String,
    iban: String,
    branchName: String,
    branchCode: String,
    branchCity: String,
});
