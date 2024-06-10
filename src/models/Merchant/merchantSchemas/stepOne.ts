/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 10/06/2024 - 13:49:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 10/06/2024
    * - Author          : 
    * - Modification    : 
**/
import { Schema, model } from 'mongoose';
import { Director, StepOne } from '../../../types/merchantTypes/merchant';

const DirectorSchema = new Schema<Director>({
    fullName: String,
    cnic: String,
    mobile: String,
    email: String,
    address: String,
    state: String,
    city: String,
    name: String,
});

export const StepOneSchema = new Schema<StepOne>({
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


