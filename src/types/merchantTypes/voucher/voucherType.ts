import { Document,Types } from "mongoose";

export interface IVoucher extends Document {
  merchant:Types.ObjectId;
  amount: number;
  voucherId: number;
  status:string;
  paymentMethod:string;
  customFields?: Record<string, any>;
}
