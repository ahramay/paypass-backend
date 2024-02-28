import { Request, Response } from "express";
import merchantUser from "../../../models/Merchant/merchantuser/merchantuserModel";

export const addUser = async (req: Request, res: Response) => {
      const data = req.body;
      const userId = req.user?.userId;
    
      const merchantUsers = await merchantUser.create({ ...data, merchant: userId });
      res.status(201).json(merchantUsers);
  };