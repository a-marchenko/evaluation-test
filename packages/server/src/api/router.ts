import { Router } from 'express';

import authRouter from './routes/auth';
import usersRouter from './routes/users';
import chatRoomsRouter from './routes/chatRooms';

const router = Router();

router.use('/auth/', authRouter);

router.use('/users/', usersRouter);

router.use('/chat_rooms/', chatRoomsRouter);

export default router;
