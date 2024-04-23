"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepTwoSchema = void 0;
const mongoose_1 = require("mongoose");
exports.StepTwoSchema = new mongoose_1.Schema({
    mainLineOfBusiness: String,
    website: String,
    mobile: String,
    email: String,
    address: String,
    state: String,
    city: String,
    additionalMobile: String,
    additionalEmail: String,
    additionalAddress: String,
    additionalState: String,
    additionalCity: String,
});
