"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepThreeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.StepThreeSchema = new mongoose_1.Schema({
    primaryPOCName: String,
    primaryPOCMobile: String,
    primaryPOCEmail: String,
    primaryPOCCnic: String,
    primaryPOCDesignation: String,
    secondaryPOCName: String,
    secondaryPOCMobile: String,
    secondaryPOCEmail: String,
    secondaryPOCCnic: String,
    secondaryPOCDesignation: String,
    agreementDetailsNameOfSignee: String,
    agreementDetailsCnic: String,
    agreementDetailsDesignation: String,
    agreementDetailsEmail: String,
    agreementDetailsMobile: String,
    agreementDetailsPlaceOfExecution: String,
    declarationNameOfSignee: String,
    declarationCnic: String,
    declarationDesignation: String,
    declarationEmail: String,
    declarationMobile: String,
    declarationPlaceOfExecution: String,
});
