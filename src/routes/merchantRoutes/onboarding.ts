// merchantStepsRoutes.ts
import express from 'express';
import { getAllMerchantDetail, getMerchantDetail, updateMerchantStep,getMerchantClient,createMerchantClient , updateMerchantClient, deleteMerchantClient ,fileUpdate,fileInsert} from '../../controllers/merchantControllers/merchant';
import { authMiddleware } from '../../middlewares/authMiddleware';
// import models from "../../models/Merchant/voucher/voucherFields";
import { getExacel,exacelUpdate,exacelInsert } from '../../controllers/merchantControllers/Voucher/voucherController';

const router = express.Router();
router.get('/merchant',getAllMerchantDetail)
router.post('/merchantClient', createMerchantClient)
router.get('/merchantClient', getMerchantClient)
router.put('/merchant-client/:id', updateMerchantClient);
router.delete('/merchant-client/:id', deleteMerchantClient);
// router.post('/bulk-insert',fileInsert);
router.get('/exacelUploads', getExacel);
router.post('/exacel-bulk-update', exacelUpdate);
router.post('/exacelinsert', exacelInsert);
// router.use("/jokes", require("src/helpers/base.crud")(models.Joke));
router.use(authMiddleware)
router.put('/:stepNumber', updateMerchantStep);
router.get('/merchant/form',getMerchantDetail)

export default router;