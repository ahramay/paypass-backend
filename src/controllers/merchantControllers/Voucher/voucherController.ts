import { Request, Response } from "express";
import Voucher from "../../../models/Merchant/voucher/voucherModel";

// This will return Merchant voucher it's used token for merchant Id
export const getMerchantVoucher = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const vouchers = await Voucher.find({ merchant: userId }).sort({createdAt:-1});
  res.send(vouchers);
};

// This Controller add new Voucher For merchant, it,s used token for merchant id
export const AddVoucher = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user?.userId;

  const voucher = await Voucher.create({ ...data, merchant: userId });
  res.status(201).json(voucher);
};

// The Delete Voucher to Delete Merchant Voucher, it's used voucher id in params
export const deleteVoucher = async (req: Request, res: Response) => {
  const voucherId = req.params.voucherId;

  const existingVoucher = await Voucher.findByIdAndDelete(voucherId);

  if (!existingVoucher) {
    return res.status(404).json({
      success: false,
      message: "Voucher Not Found",
    });
  }

  res.json({
    success: true,
    message: "Voucher Success fully Deleted",
  });
};
