import { z } from 'zod';

const FlowerSchemaValidations = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});
const UpdateFlowerSchemaValidations = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  color: z.string().optional(),
  bloomDate: z.string().optional(),
  // type: z.array(z.string()).optional(),
  type: z.union([z.string(), z.array(z.string())]).optional(),
  size: z.enum(['big', 'medium', 'small']).optional(),
  fragrance: z.string().optional(),
});

export const Flowerzodvalidation = {
  FlowerSchemaValidations,
  UpdateFlowerSchemaValidations,
};
