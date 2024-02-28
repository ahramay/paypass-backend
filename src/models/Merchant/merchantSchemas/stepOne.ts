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


