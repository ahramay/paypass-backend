import { Document,Types } from "mongoose";

export interface IVoucher extends Document {
  merchant:Types.ObjectId;
  name: string;
  amount: number;
  voucherId: number;
  purpose: string;
  email: string;
  mobile: string;
  status:string;
  dueDate:string;
  paidDate:string;
  paymentMethod:string;
}
