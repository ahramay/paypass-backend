import { Document,Types } from "mongoose";

export interface MerchatClinet extends Document {
  merchant:Types.ObjectId;
  merchantClientId:Types.ObjectId;
  email: string
  password: string
  confirmPassword: string
  phone: string
  fullName: string
  role:string
  user: Types.ObjectId; 
}


export interface ISignUpForm {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  phone: string
}