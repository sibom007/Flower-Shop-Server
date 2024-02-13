import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { FlowerRoutes } from '../modules/Flower/Flower.routs';
import { salesrouts } from '../modules/Sales/sales.routs';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/Flower',
    route: FlowerRoutes,
  },
  {
    path: '/Flower',
    route: salesrouts,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
