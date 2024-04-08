import { Document,Types } from "mongoose";

export interface IVoucher extends Document {
  merchant:Types.ObjectId;
  customFields?: Record<string, any>;
}
