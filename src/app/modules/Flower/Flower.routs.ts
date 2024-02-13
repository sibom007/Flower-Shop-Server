import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { Flowerzodvalidation } from './Flower.zodvalidation';
import { FlowerControllers } from './Flower.contonraller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(Flowerzodvalidation.FlowerSchemaValidations),
  FlowerControllers.createFlower,
);
router.get('/', auth(USER_ROLE.user), FlowerControllers.getallFlower);
router.get(
  '/AlldeletedFlower',
  auth(USER_ROLE.user),
  FlowerControllers.alldeleteFlower,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(Flowerzodvalidation.UpdateFlowerSchemaValidations),
  FlowerControllers.updateFlower,
);
router.put('/:id', auth(USER_ROLE.user), FlowerControllers.deleteFlower);
router.put('/', auth(USER_ROLE.user), FlowerControllers.BulkDeleteFlower);
router.get(
  '/userId/:id',
  auth(USER_ROLE.user),
  FlowerControllers.getUserFlowerById,
);
router.get('/:id', auth(USER_ROLE.user), FlowerControllers.getFlowerById);
export const FlowerRoutes = router;
