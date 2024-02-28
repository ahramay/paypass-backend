import { Request, Response } from 'express';
import Merchant from '../../models/Merchant/merchantModel';
import { MerchantDocument } from '../../types/merchantTypes/merchant';
interface CustomRequest extends Request {
    existingMerchant?: MerchantDocument;
  }
// Middleware to validate if the user exists
export const validateUserExists = async (req: CustomRequest, res: Response, next: Function) => {
    const { userId } = req.body;
  
    try {
      const existingMerchant = await Merchant.findOne({ userId });
  
      if (!existingMerchant) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Attach the existingMerchant to the request for use in the controllers
      req.existingMerchant = existingMerchant;
      next();
    } catch (error) {
      console.error('Error in validateUserExists middleware:', error);
      res.status(500).json({ error: 'Validation failed' });
    }
  };