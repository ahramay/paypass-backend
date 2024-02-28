import { Schema, model } from 'mongoose';
import { StepThree } from '../../../types/merchantTypes/merchant';

export const StepThreeSchema = new Schema<StepThree>({
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

