import { Router } from 'express';
import { getUsers } from '../controllers/users';

const usersRouter = Router();

// lget all users
usersRouter.get('/all', async (_, res) => {
  const users = await getUsers();

  return res.status(200).send(users);
});

export default usersRouter;
