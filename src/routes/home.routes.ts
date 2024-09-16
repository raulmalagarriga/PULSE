import { Router, Request, Response } from 'express';
import path from 'path';

// New Router instance
const router = Router();

// Home routes
router.get('/', (req: Request, res: Response) => {
    // res.send('Server made with node JS, Typescript and Express');
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default router;