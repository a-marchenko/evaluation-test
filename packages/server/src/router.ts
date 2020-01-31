import { Router } from 'express';

import authRouter from './api/auth';

const router = Router();

router.use('/auth/', authRouter);

export default router;
