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
router.get('/sales/week', salecontorler.Weeklysales);
router.get('/sales/month', salecontorler.monthlysales);
router.get('/sales/daily', salecontorler.dailysales);
router.get('/sales/year', salecontorler.Yearlysales);
export const salesrouts = router;