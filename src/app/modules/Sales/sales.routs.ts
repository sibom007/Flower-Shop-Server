import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { salecontorler } from './sales.contoler';
import { saleszodvalidation } from './sales.zodvalidation';

const router = express.Router();

router.post(
  '/sales',
  validateRequest(saleszodvalidation.salesSchemaValidations),
  salecontorler.createSale,
);
router.post('/sales/createCoupon', validateRequest(saleszodvalidation.couponSchemaValidations), salecontorler.couponcreate);
router.get('/sales/getCoupon', salecontorler.getcoupon);


router.get('/sales/week', salecontorler.Weeklysales);
router.get('/sales/month', salecontorler.monthlysales);
router.get('/sales/daily', salecontorler.dailysales);
router.get('/sales/year', salecontorler.Yearlysales);
router.patch('/sales/pointUpdate', salecontorler.PointUpdate);
export const salesrouts = router;
