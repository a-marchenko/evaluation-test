import { compare } from 'bcrypt';

import { User } from '../../db/User';

import { createAccessToken, createRefreshToken } from '../../services/jwt';

export const login = async (name: string, password: string) => {
  let user: User | undefined;

  // try to find user with given name
  user = await User.findOne({
    select: ['id', 'name', 'password', 'token_version'],
    where: { name: name },
  });

  // throw error if incorrect name given
  if (!user) {
    throw new Error('Incorrect name or password');
  }

  // try to compare user password with given one
  const isPasswordValid = await compare(password, user.password);

  // throw error if incorrect password given
  if (!isPasswordValid) {
    throw new Error('Incorrect name or password');
  }

  return {
    accessToken: createAccessToken(user),
    refreshToken: createRefreshToken(user),
  };
};
