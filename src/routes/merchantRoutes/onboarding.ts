// merchantStepsRoutes.ts
import express from 'express';
import { getAllMerchantDetail, getMerchantDetail, updateMerchantStep,getMerchantClient,createMerchantClient , updateMerchantClient, deleteMerchantClient ,fileUpdate,fileInsert} from '../../controllers/merchantControllers/merchant';
import { authMiddleware } from '../../middlewares/authMiddleware';
// import models from "../../models/Merchant/voucher/voucherFields";
import { getExacel,exacelUpdate,exacelInsert } from '../../controllers/merchantControllers/Voucher/voucherController';


const router = express.Router();
router.use(authMiddleware)
router.post('/merchantClient', createMerchantClient)
router.get('/merchant',getAllMerchantDetail)
router.get('/merchantClient', getMerchantClient)
router.put('/merchant-client/:id', updateMerchantClient);
router.delete('/merchant-client/:id', deleteMerchantClient);
router.post('/exacelinsert', exacelInsert);
router.get('/get-Exacel', getExacel);
router.put('/:stepNumber', updateMerchantStep);
router.get('/merchant/form',getMerchantDetail)
// router.post('/exacel-bulk-update', exacelUpdate);
// router.post('/bulk-insert',fileInsert);
// router.get('/exacelinsert', exacelInsert); //for testing
// router.use("/jokes", require("src/helpers/base.crud")(models.Joke));
export default router;