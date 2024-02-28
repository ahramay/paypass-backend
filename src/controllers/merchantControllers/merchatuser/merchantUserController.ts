import { Request, Response } from "express";
import merchantUser from "../../../models/Merchant/merchantuser/merchantuserModel";

// This will return Merchant MerchantUser it's used token for merchant Id
export const getMerchantUser = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const merchantUsers = await merchantUser.find({ merchant: userId }).sort({createdAt:-1});
  res.json(merchantUsers);
};

// This Controller add new MerchantUser For merchant, it,s used token for merchant id
export const addMerchantUser = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user?.userId;

  const merchantUsers = await merchantUser.create({ ...data, merchant: userId });
  res.status(201).json(merchantUsers);
};

// The Delete MerchantUser to Delete Merchant MerchantUser, it's used MerchantUser id in params
export const deleteMerchantUser = async (req: Request, res: Response) => {
  const merchantUsersId = req.params.merchantUsersId;

  const existingMerchantUsers = await merchantUser.findByIdAndDelete(merchantUsersId);

  if (!existingMerchantUsers) {
    return res.status(404).json({
      success: false,
      message: "MerchantUser Not Found",
    });
  }

  res.json({
    success: true,
    message: "MerchantUser Success fully Deleted",
  });
};
