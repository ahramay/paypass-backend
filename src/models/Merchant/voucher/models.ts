import mongoose from "mongoose";
import {iModel} from "../../../types/merchantTypes/voucher/modelsType" 



const ExacelUploadSchema = new mongoose.Schema<iModel>(
  {
    merchant:{
      type:mongoose.Schema.Types.ObjectId,
      required:true
    },
    voucherId: {
      type: Number,
      // required:true,
    },
    ChallanNo: {
      type: String,
    },
    RollNo: {
      type: String,
    },
    department: {
      type: String,
    },
    FeeType: {
      type: String,
    },
    Name: {
      type: String,
    },
    FatherName: {
      type: String,
    },
    Total: {
      type: String,
    },
    status: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
  },
  { strict: false, timestamps: true }
);

export const ExacelUpload = mongoose.model("ExacelUpload", ExacelUploadSchema);
