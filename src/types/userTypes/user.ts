import { Document } from 'mongoose';

interface IUser extends Document {
  fullName: string;
  organizationName: string;
  cnic: string;
  phone: string;
  email: string;
  password: string;
  countryCode:string;
  status:string;
  role:string
}

export interface ISignUpForm {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  countryCode: string
  phone: string
}
export type TSignIn = {
  email: string
  password: string
}
export default IUser;
