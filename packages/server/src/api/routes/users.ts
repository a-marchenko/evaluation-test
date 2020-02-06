import { Router } from 'express';
import { getUsers } from '../controllers/users';

const usersRouter = Router();

// get all users
usersRouter.get('/', async (_, res) => {
  const users = await getUsers();

  return res.status(200).send(users);
});

export default usersRouter;
