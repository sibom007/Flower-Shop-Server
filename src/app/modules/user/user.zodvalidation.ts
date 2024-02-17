import { z } from 'zod';

const UserSchemaValidations = z.object({
  username: z.string(),
  email: z.string(),
  role: z.string().optional(),
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
});
const UserRoleSchemaValidations = z.object({
  id: z.string(),
  role: z.string(),
});

export const userzodvalidation = {
  UserSchemaValidations,
  UserRoleSchemaValidations
};
