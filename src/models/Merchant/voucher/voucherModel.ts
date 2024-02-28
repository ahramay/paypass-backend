import mongoose from "mongoose";
import { IVoucher } from "../../../types/merchantTypes/voucher/voucherType";
const voucherSchema = new mongoose.Schema<IVoucher>(
  {
    merchant:{
      type:mongoose.Schema.Types.ObjectId,
      required:true
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    voucherId: {
      type: Number,
      // required:true,
    },
    purpose: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    dueDate:{
      type:String,
    },
    paidDate:{
      type:String
    },
    paymentMethod:{
      type:String
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
