import express from "express";
import {
  addMerchantUser,
  deleteMerchantUser,
  getMerchantUser,
} from "../../../controllers/merchantControllers/merchatuser/merchantUserController";
import { authMiddleware } from "../../../middlewares/authMiddleware";
const router = express.Router();

// Auth Middleware to validate user Token and it's applied to all routes below
router.use(authMiddleware);

// create new merchantUser
router.post("/", addMerchantUser);

// Delete merchantUser
router.delete("/:merchantUserId", deleteMerchantUser);

// get Merchant merchantUser
router.get("/getmerchantuser", getMerchantUser);

export default router;
