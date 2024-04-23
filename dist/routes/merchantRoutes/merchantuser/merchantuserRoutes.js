"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const merchantUserController_1 = require("../../../controllers/merchantControllers/merchatuser/merchantUserController");
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
const router = express_1.default.Router();
// Auth Middleware to validate user Token and it's applied to all routes below
router.use(authMiddleware_1.authMiddleware);
// create new merchantUser
router.post("/", merchantUserController_1.addMerchantUser);
// Delete merchantUser
router.delete("/:merchantUserId", merchantUserController_1.deleteMerchantUser);
// get Merchant merchantUser
router.get("/getmerchantuser", merchantUserController_1.getMerchantUser);
exports.default = router;
