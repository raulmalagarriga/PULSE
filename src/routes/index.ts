import { Router } from 'express';
import homeRouter from './home.routes';
import usersRouter from './users.routes';
import authRouter from './auth.routes';
import trainerRouter from './trainer.routes';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/', homeRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/trainer', trainerRouter);

export default router;