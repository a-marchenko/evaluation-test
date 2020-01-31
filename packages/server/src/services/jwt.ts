import { sign, verify } from 'jsonwebtoken';

import { User } from '../db/User';

/**
 *
 * JWT
 *
 * */

interface AuthPayload {
  id: number;
  name: string;
  tokenVersion: number;
}

export const accessSecret = process.env.JWT_ACCESS_SECRET || 'TMP_ACCESS_SECRET';

export const refreshSecret = process.env.JWT_REFRESH_SECRET || 'TMP_REFRESH_SECRET';

export const createAccessToken = (user: User) => {
  return sign({ id: user.id, name: user.name }, accessSecret, {
    expiresIn: '1d',
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { id: user.id, username: user.name, tokenVersion: user.token_version },
    refreshSecret,
    {
      expiresIn: '7d',
    },
  );
};

export const refreshTokens = async (token: string) => {
  let accessToken: string;
  let refreshToken: string;
  let ok: boolean;
  let name: string;

  let payload: AuthPayload;

  try {
    payload = verify(token, refreshSecret) as AuthPayload;

    const user = await User.findOne(payload.id);
    if (user) {
      if (user.token_version === payload.tokenVersion) {
        ok = true;
        accessToken = createAccessToken(user);
        refreshToken = createRefreshToken(user);
        name = user.name;
      } else {
        ok = false;
        accessToken = '';
        refreshToken = '';
        name = '';
      }
    } else {
      ok = false;
      accessToken = '';
      refreshToken = '';
      name = '';
    }
  } catch {
    ok = false;
    accessToken = '';
    refreshToken = '';
    name = '';
  }

  return {
    ok,
    accessToken,
    refreshToken,
    name,
  };
};

export const invalidateTokens = async (token: string) => {
  let ok = false;
  let message = '';

  let payload: AuthPayload;

  try {
    payload = verify(token, refreshSecret) as AuthPayload;

    const user = await User.findOne(payload.id);
    if (user) {
      try {
        await User.update(user.id, { token_version: user.token_version + 1 });
        ok = true;
        message = 'Successfully logged out';
      } catch (err) {
        ok = false;
        message = 'Something went wrong :(';
      }
    } else {
      ok = false;
      message = 'User not found';
    }
  } catch (e) {
    ok = false;
    message = 'Something went wrong :(';
  }

  return {
    ok,
    message,
  };
};
