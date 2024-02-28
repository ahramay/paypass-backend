import { Schema, model } from 'mongoose';
import { StepFour } from '../../../types/merchantTypes/merchant';

export const StepFourSchema = new Schema<StepFour>({
    bankName: String,
    accountTitle: String,
    accountNumber: String,
    iban: String,
    branchName: String,
    branchCode: String,
    branchCity: String,
});

