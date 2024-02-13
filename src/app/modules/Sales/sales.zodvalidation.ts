import { z } from 'zod';

const salesSchemaValidations = z.object({
  quantitySold: z.number(),
});

export const saleszodvalidation = {
  salesSchemaValidations,
};
