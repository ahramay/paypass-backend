"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepOneSchema = void 0;
const mongoose_1 = require("mongoose");
const DirectorSchema = new mongoose_1.Schema({
    fullName: String,
    cnic: String,
    mobile: String,
    email: String,
    address: String,
    state: String,
    city: String,
    name: String,
});
exports.StepOneSchema = new mongoose_1.Schema({
    legalName: String,
    merchantBrandName: String,
    NTN: String,
    regulatoryAuthorityName: String,
    salesTaxRegistration: String,
    nationalTaxNumber: String,
    CeoName: String,
    ceoCNIC: String,
    CeoMobile: String,
    ceoEmail: String,
    ceoAddress: String,
    ceoState: String,
    ceoCity: String,
    directors: [DirectorSchema],
});
