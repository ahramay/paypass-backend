import express from "express";
import {
  AddVoucher,
  deleteVoucher,
  getMerchantVoucher,
} from "../../../controllers/merchantControllers/Voucher/voucherController";
import { authMiddleware } from "../../../middlewares/authMiddleware";
const router = express.Router();

// Auth Middleware to validate user Token and it's applied to all routes below
router.use(authMiddleware);

// create new voucher
router.post("/", AddVoucher);

// Delete Voucher
router.delete("/:voucherId", deleteVoucher);

// get Merchant Vouchers
router.get("/merchant-vouchers", getMerchantVoucher);

export default router;
