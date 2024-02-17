import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { userzodvalidation } from '../user/user.zodvalidation';
import { UserControllers } from '../user/user.contorler';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userzodvalidation.UserSchemaValidations),
  UserControllers.createUser,
);
router.put(
  '/updateRole',
  auth(USER_ROLE.admin,USER_ROLE.manager),
  UserControllers.updateUser,
);

router.get(
  '/SingleUser/:id',
  UserControllers.singleUser,
);
router.get(
  '/TotalUser',
  UserControllers.totalUser,
);

router.get(
  '/TodayUser',
  UserControllers.todayUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// );

// router.post(
//   '/forget-password',
//   validateRequest(AuthValidation.forgetPasswordValidationSchema),
//   AuthControllers.forgetPassword,
// );

// router.post(
//   '/reset-password',
//   validateRequest(AuthValidation.forgetPasswordValidationSchema),
//   AuthControllers.resetPassword,
// );

export const AuthRoutes = router;
