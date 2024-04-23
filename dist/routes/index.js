"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("./authRoutes/auth"));
const onboarding_1 = __importDefault(require("./merchantRoutes/onboarding"));
const voucherRoutes_1 = __importDefault(require("./merchantRoutes/voucher/voucherRoutes"));
const newTestRoutes_1 = __importDefault(require("./merchantRoutes/merchantuser/newTestRoutes"));
const merchantuserRoutes_1 = __importDefault(require("./merchantRoutes/merchantuser/merchantuserRoutes"));
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
// User Authentication Route
router.use("/auth", auth_1.default);
// Merchant Routes
router.use("/onboarding", onboarding_1.default);
router.use("/voucher", voucherRoutes_1.default);
router.use("/test", newTestRoutes_1.default);
router.use("/merchatuser", merchantuserRoutes_1.default);
// Admin Routes
router.use('/admin', adminRoutes_1.default);
// Admin Routes
exports.default = router;
