export interface User {
  id: number;
  name: string;
}

export interface Message {
  chatRoomId: number;
  senderName: string;
  text: string;
  createdAt: string;
}

export interface Chat {
  id: number;
  name: string;
  token: string;
  owner: User;
  members: User[];
  messages: Message[];
}

export interface Member {
  name: string;
  room: string;
  socketId?: string;
}
