import { hash } from 'bcrypt';

import { User } from '../../db/User';

import { createAccessToken, createRefreshToken } from '../../services/jwt';

export const createNewUser = async (name: string, password: string) => {
  let user: User | undefined;

  // try to find user with given name
  user = await User.findOne({ where: { name: name } });

  // throw error if user with given name already exists
  if (user) {
    throw new Error('Name already in use');
  }

  const hashedPassword = await hash(password, 12);

  user = User.create({
    name: name,
    password: hashedPassword,
  });

  await user.save();

  return {
    accessToken: createAccessToken(user),
    refreshToken: createRefreshToken(user),
  };
};

export const getUsers = async () => {
  let users = await User.find({ select: ['name'] });

  return users;
};
