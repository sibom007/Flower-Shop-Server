import { z } from 'zod';

const salesSchemaValidations = z.object({
  quantitySold: z.number(),
});

const couponSchemaValidations = z.object({
  CouponCode: z.number().optional(),
  CouponDiscount: z.number(),
});

export const saleszodvalidation = {
  salesSchemaValidations,
  couponSchemaValidations,
};
