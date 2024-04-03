import { Document,Types } from "mongoose";

export interface IUser extends Document {
  merchant:Types.ObjectId;
  merchantUserId:Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  address:string;
  status:string;
}
