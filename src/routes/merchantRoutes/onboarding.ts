// merchantStepsRoutes.ts
import express from 'express';
import { getAllMerchantDetail, getMerchantDetail, updateMerchantStep } from '../../controllers/merchantControllers/merchant';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();
router.get('/merchant',getAllMerchantDetail)

router.use(authMiddleware)
router.put('/:stepNumber', updateMerchantStep);
router.get('/merchant/form',getMerchantDetail)

export default router;
