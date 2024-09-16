import { Router } from 'express';
import { authUserController } from '../controllers/auth.controller';

const router = Router();

// ROUTES
router.post('/', authUserController);

export default router;