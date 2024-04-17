import mongoose from "mongoose";
import { IUser } from "../../../types/merchantTypes/merchantUser/merchantUserType";
import { string } from "yup";
const merchantUserSchema = new mongoose.Schema<IUser>(
  {
    merchant:{
      type:mongoose.Schema.Types.ObjectId,
      required:false
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    number: {
      type: String,
    },
    address:{
      type:String,
    },
    status: {
      type: String,
      enum: ["unpaid", "paid", "failed", "expired"],
      default: "unpaid",
    },
    role:{
      type:String
    }
  },
  { timestamps: true }
);

const merchantUser = mongoose.model("merchantUser", merchantUserSchema);
export default merchantUser;
