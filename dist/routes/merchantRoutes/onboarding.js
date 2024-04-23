"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// merchantStepsRoutes.ts
const express_1 = __importDefault(require("express"));
const merchant_1 = require("../../controllers/merchantControllers/merchant");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
// import models from "../../models/Merchant/voucher/voucherFields";
const voucherController_1 = require("../../controllers/merchantControllers/Voucher/voucherController");
const router = express_1.default.Router();
router.use(authMiddleware_1.authMiddleware);
router.post('/merchantClient', merchant_1.createMerchantClient);
router.get('/merchant', merchant_1.getAllMerchantDetail);
router.get('/merchantClient', merchant_1.getMerchantClient);
router.put('/merchant-client/:id', merchant_1.updateMerchantClient);
router.delete('/merchant-client/:id', merchant_1.deleteMerchantClient);
router.post('/exacelinsert', voucherController_1.exacelInsert);
router.get('/get-Exacel', voucherController_1.getExacel);
router.put('/update-status/:id', voucherController_1.UpdateStatus);
router.put('/:stepNumber', merchant_1.updateMerchantStep);
router.get('/merchant/form', merchant_1.getMerchantDetail);
router.get('/get-user', merchant_1.getUserDetails);
// router.post('/exacel-bulk-update', exacelUpdate);
// router.post('/bulk-insert',fileInsert);
// router.get('/exacelinsert', exacelInsert); //for testing
// router.use("/jokes", require("src/helpers/base.crud")(models.Joke));
exports.default = router;
