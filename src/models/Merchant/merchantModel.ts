import mongoose, { Schema, } from 'mongoose';
import {StepOneSchema,StepTwoSchema,StepThreeSchema, StepFourSchema} from './merchantSchemas'
import { MerchantDocument } from '../../types/merchantTypes/merchant';


const MerchantSchema = new Schema<MerchantDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  currentStep: {
    type: Number,
    default: 0, // Assuming the first step is 1
  },
  stepOne:StepOneSchema,
  stepTwo: StepTwoSchema,
  stepThree: StepThreeSchema,
  stepFour:StepFourSchema,
},{timestamps:true});


const Merchant = mongoose.model('Merchant', MerchantSchema);

export default Merchant;
