import { Router } from 'express';
import { createNewUser, login, refreshTokens, invalidateTokens } from '../services/auth';

const authRouter = Router();

// register new account
authRouter.post('/register', async (req, res) => {
  const name: string = req.body.name;
  const password: string = req.body.password;

  // fail if no crededentials in req.body
  if (!name || !password) {
    return res.status(403).send({ ok: false, message: 'No credentials specified!' });
  }

  // try to create user with given credentials and get UAT and URT
  try {
    const { accessToken, refreshToken } = await createNewUser(name, password);

    // set refresh token to cookie
    res.cookie('URT', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    });

    // success if UAT and URT created
    return res.status(201).send({ ok: true, UAT: accessToken });
  } catch (err) {
    // fail if any thrown error
    return res.status(403).send({ ok: false, message: err.toString() });
  }
});

// login to account
authRouter.post('/login', async (req, res) => {
  const name: string = req.body.name;
  const password: string = req.body.password;

  // fail if no crededentials in req.body
  if (!name || !password) {
    return res.status(403).send({ ok: false, message: 'No credentials specified!' });
  }

  // try to find user with given credentials and get UAT and URT
  try {
    const { accessToken, refreshToken } = await login(name, password);

    // set refresh token to cookie
    res.cookie('URT', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    });

    // success if UAT and URT created
    return res.status(201).send({ ok: true, UAT: accessToken });
  } catch (err) {
    // fail if any thrown error
    return res.status(403).send({ ok: false, message: err.toString() });
  }
});

// refresh tokens
authRouter.post('/refresh', async (req, res) => {
  const URT: string | undefined = req.cookies.URT;

  if (!URT) {
    // fail if no cookie with token found
    return res.status(403).send({ ok: false, UAT: '' });
  } else {
    // try to get new UAT and URT
    const { ok, accessToken, refreshToken } = await refreshTokens(URT);

    // set new URT cookie
    res.cookie('URT', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    });

    // send new UAT
    return res.status(201).send({ ok: ok, UAT: accessToken });
  }
});

// logout
authRouter.post('/logout', async (req, res) => {
  const URT: string | undefined = req.cookies.URT;

  if (!URT) {
    // fail if no cookie with token found
    return res.status(403).send({ ok: false, message: 'No token provided' });
  } else {
    // try invalidate existing tokens
    const { ok, message } = await invalidateTokens(URT);

    // set empty URT cookie
    res.cookie('URT', '');

    if (ok) {
      // send with success status
      return res.status(200).send({ ok: ok, message: message });
    } else {
      // send with error status
      return res.status(403).send({ ok: ok, message: message });
    }
  }
});

export default authRouter;
