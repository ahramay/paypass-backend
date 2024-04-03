// merchantStepsRoutes.ts
import express from 'express';
import { getAllMerchantDetail, getMerchantDetail, updateMerchantStep,getMerchantClient,createMerchantClient } from '../../controllers/merchantControllers/merchant';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();
router.get('/merchant',getAllMerchantDetail)
router.post('/merchantClient', createMerchantClient)
router.get('/merchantClient', getMerchantClient)

router.use(authMiddleware)
router.put('/:stepNumber', updateMerchantStep);
router.get('/merchant/form',getMerchantDetail)

export default router;
