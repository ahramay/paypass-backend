/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 10/06/2024 - 13:53:17
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 10/06/2024
    * - Author          : 
    * - Modification    : 
**/
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
    incorporationregulatoryAuthorityName: String,
    salesTaxDate:String,
    organization:String,
    salesTaxAuthorityName:String,
    salesTaxRegistration: String,
    nationalTaxNumber: String,
    IncorporationNtn:String,
    IncorporationDate:String,
    CeoName: String,
    ceoCNIC: String,
    CeoMobile: String,
    ceoEmail: String,
    ceoAddress: String,
    ceoState: String,
    ceoCity: String,
    directors: [DirectorSchema],
});
