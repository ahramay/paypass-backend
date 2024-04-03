import { Request, Response } from "express";
import Voucher from "../../../models/Merchant/voucher/voucherModel";
import merchantUser from "../../../models/Merchant/merchantuser/merchantuserModel";

import { Document } from 'mongoose';
// This will return Merchant voucher it's used token for merchant Id
export const getMerchantVoucher = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const vouchers = await Voucher.find({ merchant: userId }).sort({createdAt:-1});
  res.send(vouchers);
};


// export const AddVoucher = async (req: Request, res: Response) => {
//   const data = req.body;
//   const userId = req.user?.userId;

//   // Find the merchant user based on the provided userId
//   const merchantUsers = await merchantUser.findById(userId).exec(); // Retrieve instance using exec()
//   if (!merchantUsers) {
//     return res.status(404).json({ message: "Merchant user not found" });
//   }

//   // Generate a unique voucher ID
//   let voucherId: number = 0;
//   let isUnique: boolean = false;
//   while (!isUnique) {
//     voucherId = Math.floor(1000000 + Math.random() * 9000000); // Generate random 7-digit number
//     const existingVoucher = await Voucher.findOne({ voucherId });
//     if (!existingVoucher) {
//       isUnique = true;
//     }
//   }

//   // Create the voucher against the merchant user
//   const voucher = await Voucher.create({
//     ...data,
//     merchant: merchantUser._id, // Convert ObjectId to string
//     voucherId,
//   });

//   res.status(201).json(voucher);
// };

export const AddVoucher = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user?.userId;

  let voucherId: number = 0; // Initialize with a default value

  // Generate a unique 7-digit voucher ID
  let isUnique: boolean = false;
  while (!isUnique) {
    voucherId = Math.floor(1000000 + Math.random() * 9000000); // Generate random 7-digit number
    const existingVoucher = await Voucher.findOne({ voucherId });
    if (!existingVoucher) {
      isUnique = true;
    }
  }

  // Create the voucher with the generated ID
  const voucher = await Voucher.create({ ...data, merchant: userId, voucherId });
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
