import mongoose from "mongoose";
import { IVoucher } from "../../../types/merchantTypes/voucher/voucherType";
const voucherSchema = new mongoose.Schema<IVoucher>(
  {
    merchant:{
      type:mongoose.Schema.Types.ObjectId,
      required:true
    }, 
    customFields: {
      type: mongoose.Schema.Types.Mixed, // Accept any type for custom fields
    },
  },
  { timestamps: true }
);

const Voucher = mongoose.model("voucher", voucherSchema);
export default Voucher;
