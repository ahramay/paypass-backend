import mongoose from "mongoose";
import { IVoucher } from "../../../types/merchantTypes/voucher/voucherType";

const voucherSchema = new mongoose.Schema(
  {
    // merchant:{
    //   type:mongoose.Schema.Types.ObjectId,
    //   required:true
    // },
    ChallanNo :{
        type:String,
    },
    RollNo :{
        type:String,
    },
    department :{
        type:String,
    },
    FeeType:{
        type:String,
    },
    Name:{
        type:String,
    },
    FatherName:{
        type:String,
    },
    Total:{
        type:String,
    }


     
  },
  { timestamps: true }
);

const VoucherFields = mongoose.model("VoucherFields", voucherSchema);
export default VoucherFields;