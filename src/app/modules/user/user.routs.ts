import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.contorler';
import { userzodvalidation } from './user.zodvalidation';

const router = express.Router();

router.post(
  '/',
  validateRequest(userzodvalidation.UserSchemaValidations),
  UserControllers.createUser,
);
export const UserRoutes = router;
