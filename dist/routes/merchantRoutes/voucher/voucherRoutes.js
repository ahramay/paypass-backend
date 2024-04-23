"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const voucherController_1 = require("../../../controllers/merchantControllers/Voucher/voucherController");
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
const router = express_1.default.Router();
// Auth Middleware to validate user Token and it's applied to all routes below
router.use(authMiddleware_1.authMiddleware);
// create new voucher
router.post("/", voucherController_1.AddVoucher);
// Delete Voucher
router.delete("/:voucherId", voucherController_1.deleteVoucher);
// get Merchant Vouchers
router.get("/merchant-vouchers", voucherController_1.getMerchantVoucher);
exports.default = router;
