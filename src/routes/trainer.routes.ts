import { Router } from 'express';
import { verifyToken } from '../utils/security';
import { createTrainerController, getTrainerByIdController, getTrainersController } from '../controllers/trainer.controller';
const router = Router();

// ROUTES
router.get('/', verifyToken, getTrainersController);
router.get('/:id', verifyToken, getTrainerByIdController);
router.post('/', verifyToken, createTrainerController);

export default router;