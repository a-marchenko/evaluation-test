import url from 'url';
import { Router } from 'express';

import {
  getUserChatRooms,
  createChatRoom,
  joinChatRoom,
  getChatRoomById,
} from '../controllers/chatRooms';

import { ChatRoom } from '../../db/ChatRoom';

const chatRoomsRouter = Router();

// create new chat room
chatRoomsRouter.post('/new', async (req, res) => {
  let ok = false;
  let message = '';
  let chatId: number | null = null;

  const name = req.body.name;
  const accessToken = req.headers['authorization']?.split(' ')[1];

  if (accessToken && name) {
    try {
      chatId = await createChatRoom(accessToken, name);
      ok = true;
    } catch (err) {
      message = err.message;
      return res.status(403).send({ ok, message, chatId });
    }
  } else {
    message = 'Wrong credentials';
    return res.status(403).send({ ok, message, chatId });
  }
  return res.status(201).send({ ok, message, chatId });
});

// get all user's chat rooms
chatRoomsRouter.get('/', async (req, res) => {
  let ok = false;
  let message = '';
  let chatRooms: ChatRoom[] = [];

  const accessToken = req.headers['authorization']?.split(' ')[1];

  if (accessToken) {
    try {
      chatRooms = await getUserChatRooms(accessToken);
      ok = true;
    } catch (err) {
      message = err.message;
      return res.status(403).send({ ok, message, chatRooms });
    }
  } else {
    message = 'Wrong credentials';
    return res.status(403).send({ ok, message, chatRooms });
  }

  return res.status(200).send({ ok, message, chatRooms });
});

// get chat room by id
chatRoomsRouter.get('/:id', async (req, res) => {
  let ok = false;
  let message = '';
  let chatRoom: ChatRoom | null = null;

  const refreshToken = req.cookies.URT;
  let chatId: number;

  try {
    chatId = parseInt(req.params['id']);
  } catch {
    message = 'Wrong route parameter';
    return res.status(403).send({ ok, message, chatRoom });
  }

  if (refreshToken && chatId) {
    try {
      chatRoom = await getChatRoomById(refreshToken, chatId);
      ok = true;
    } catch (err) {
      message = err.message;
      return res.status(403).send({ ok, message, chatRoom });
    }
  } else {
    message = 'Wrong credentials';
    return res.status(403).send({ ok, message, chatRoom });
  }

  return res.status(200).send({ ok, message, chatRoom });
});

// join chat room
chatRoomsRouter.get('/join/:token', async (req, res) => {
  let message = '';
  let chatRoomId: number;

  const inviteToken = req.params['token'];
  const refreshToken = req.cookies.URT;

  if (refreshToken && inviteToken) {
    try {
      chatRoomId = await joinChatRoom(refreshToken, inviteToken);
      return res.redirect(`/chat/${chatRoomId}`);
    } catch (err) {
      message = err.message;
      return res.redirect(
        307,
        url.format({
          pathname: '/join_failed',
          query: {
            message: message,
          },
        }),
      );
    }
  } else if (!refreshToken) {
    res.redirect(307, '/login');
  } else {
    message = 'Wrong credentials';
    return res.redirect(
      307,
      url.format({
        pathname: '/join_failed',
        query: {
          message: message,
        },
      }),
    );
  }
});

export default chatRoomsRouter;
