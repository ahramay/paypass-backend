import { Document, Types } from 'mongoose';

// Step One Schema types
export interface Director {
    fullName: string;
    cnic: string;
    mobile: string;
    email: string;
    address: string;
    state: string;
    city: string;
    name: string;
}

export interface StepOne extends Document {
    legalName: string;
    merchantBrandName: string;
    NTN: string;
    regulatoryAuthorityName: string;
    salesTaxRegistration: string;
    nationalTaxNumber: string;
    CeoName: string;
    ceoCNIC: string;
    CeoMobile: string;
    ceoEmail: string;
    ceoAddress: string;
    ceoState: string;
    ceoCity: string;
    directors: Director[];
}

// Step Two Schema types
export interface StepTwo extends Document {
  mainLineOfBusiness: string;
  website: string;
  mobile: string;
  email: string;
  address: string;
  state: string;
  city: string;
  additionalMobile: string;
  additionalEmail: string;
  additionalAddress: string;
  additionalState: string;
  additionalCity: string;
}

// Step Three Schema

export interface StepThree extends Document {
  primaryPOCName: string;
  primaryPOCMobile: string;
  primaryPOCEmail: string;
  primaryPOCCnic: string;
  primaryPOCDesignation: string;
  secondaryPOCName: string;
  secondaryPOCMobile: string;
  secondaryPOCEmail: string;
  secondaryPOCCnic: string;
  secondaryPOCDesignation: string;
  agreementDetailsNameOfSignee: string;
  agreementDetailsCnic: string;
  agreementDetailsDesignation: string;
  agreementDetailsEmail: string;
  agreementDetailsMobile: string;
  agreementDetailsPlaceOfExecution: string;
  declarationNameOfSignee: string;
  declarationCnic: string;
  declarationDesignation: string;
  declarationEmail: string;
  declarationMobile: string;
  declarationPlaceOfExecution: string;
}
// Step Four Schema

export interface StepFour extends Document {
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  branchName: string;
  branchCode: string;
  branchCity: string;
}

export interface MerchantDocument extends Document{
  _id:Types.ObjectId,
   user: Types.ObjectId;
   currentStep:number,
  stepOne: StepOne,
  stepTwo:StepTwo,
  stepThree:StepThree
  stepFour:StepFour
}