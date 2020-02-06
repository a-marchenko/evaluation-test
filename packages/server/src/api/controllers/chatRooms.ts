import { v4 } from 'uuid';
import { verify } from 'jsonwebtoken';
import { getRepository, Not } from 'typeorm';

import { ChatRoom } from '../../db/ChatRoom';
import { User } from '../../db/User';

import { AuthPayload, accessSecret, refreshSecret } from '../../services/jwt';

export const createChatRoom = async (accessToken: string, name: string) => {
  let chatRoom: ChatRoom | undefined;

  let payload = verify(accessToken, accessSecret) as AuthPayload;

  // try to find user
  let user = await User.findOne(payload.id);

  // throw error if user not found
  if (!user) {
    throw new Error('User not found');
  }

  const token = v4();

  chatRoom = ChatRoom.create({
    name: name,
    owner: user,
    token: token,
  });

  try {
    await chatRoom.save();
  } catch (err) {
    console.error(err);
  }

  return chatRoom.id;
};

export const joinChatRoom = async (refreshToken: string, inviteToken: string) => {
  let payload = verify(refreshToken, refreshSecret) as AuthPayload;

  // try to find user with given name
  let user = await User.findOne(payload.id, { relations: ['chat_rooms_invited'] });

  // throw error if user not found
  if (!user) {
    throw new Error('User not found');
  }

  // try to find chat room with given token
  let chatRoom = await ChatRoom.findOne({
    where: { owner: Not(user.id), token: inviteToken },
    relations: ['members'],
  });

  if (chatRoom) {
    // try to find user in members
    let userMember = chatRoom.members?.find(member => member.id === user?.id);
    if (!userMember) {
      // add user to chat members
      chatRoom.members = chatRoom.members?.concat(user);
    } else {
      // throw error if user is already a member of the chat
      throw new Error('You are already a member of this chat');
    }
  } else {
    // throw error if user is already an owner of the chat
    throw new Error('You are already an owner of this chat');
  }

  try {
    await chatRoom?.save();
  } catch (err) {
    console.error(err);
  }

  return chatRoom.id;
};

export const getUserChatRooms = async (accessToken: string) => {
  const payload = verify(accessToken, accessSecret) as AuthPayload;

  const chatRoomRepository = getRepository(ChatRoom);

  const chatRoomsOwned = await chatRoomRepository
    .createQueryBuilder('c')
    .select(['c.id', 'c.name'])
    .where('c."ownerId" = :id', { id: payload.id })
    .getMany();

  const chatRoomsInvited = await chatRoomRepository
    .createQueryBuilder('c')
    .select(['c.id', 'c.name'])
    .innerJoin('c.members', 'm', 'm."id" = :id', { id: payload.id })
    .getMany();

  const chatRooms = chatRoomsOwned.concat(chatRoomsInvited);

  return chatRooms;
};

export const getChatRoomById = async (refreshToken: string, chatRoomId: number) => {
  let payload = verify(refreshToken, refreshSecret) as AuthPayload;

  // try to find user with given name
  let user = await User.findOne(payload.id, { relations: ['chat_rooms_invited'] });

  // throw error if user not found
  if (!user) {
    throw new Error('User not found');
  }

  const chatRoomRepository = getRepository(ChatRoom);

  // try to find chat room
  const chatRoom = await chatRoomRepository
    .createQueryBuilder('c')
    .select(['c.id', 'c.name', 'o', 'c.token', 'mb', 'ms', 's'])
    .where('c."id" = :id', { id: chatRoomId })
    .leftJoinAndSelect('c.owner', 'o')
    .leftJoinAndSelect('c.members', 'mb')
    .leftJoinAndSelect('c.messages', 'ms')
    .leftJoinAndSelect('ms.sender', 's')
    .getOne();

  if (chatRoom) {
    // try to find user in owner or members
    const haveAccess =
      chatRoom.owner.id === user.id ||
      user.chat_rooms_invited.find(chat => chat.id === chatRoom.id);

    if (!haveAccess) {
      throw new Error('You dont have access to this chat');
    }
  } else {
    throw new Error('Chat not found');
  }

  return chatRoom;
};
