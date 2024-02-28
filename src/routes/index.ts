import express from "express";
const router = express.Router();
import authRoute from "./authRoutes/auth";
import merchantOnBoardingRoutes from "./merchantRoutes/onboarding";
import voucherRoutes from "./merchantRoutes/voucher/voucherRoutes";
import newTestRoutes from "./merchantRoutes/merchantuser/newTestRoutes";
import merchatuserRoutes from "./merchantRoutes/merchantuser/merchantuserRoutes";
import adminRoutes from "./adminRoutes";

// User Authentication Route
router.use("/auth", authRoute);

// Merchant Routes
router.use("/onboarding", merchantOnBoardingRoutes);
router.use("/voucher", voucherRoutes);
router.use("/test", newTestRoutes);
router.use("/merchatuser", merchatuserRoutes);

// Admin Routes

router.use('/admin',adminRoutes)

// Admin Routes
export default router;
