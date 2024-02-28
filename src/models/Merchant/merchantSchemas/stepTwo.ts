import { Schema, model } from 'mongoose';
import { StepTwo } from '../../../types/merchantTypes/merchant';

export const StepTwoSchema = new Schema<StepTwo>({
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

