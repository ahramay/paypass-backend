import mongoose from "mongoose";
import { IVoucher } from "../../../types/merchantTypes/voucher/voucherType";
const voucherSchema = new mongoose.Schema<IVoucher>(
  {
    merchant:{
      type:mongoose.Schema.Types.ObjectId,
      required:true
    },
    amount: {
      type: Number,
      required: true,
    },
    voucherId: {
      type: Number,
      // required:true,
    },
    paymentMethod:{
      type:String
    },
    customFields: {
      type: mongoose.Schema.Types.Mixed, // Accept any type for custom fields
    },
    status: {
      type: String,
      enum: ["unpaid", "paid", "failed", "expired"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

const Voucher = mongoose.model("voucher", voucherSchema);
export default Voucher;
