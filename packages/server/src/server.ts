import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { createServer, Server as HTTPSServer } from 'https';
import express, { Application } from 'express';
import socketIO, { Server as SocketIOServer } from 'socket.io';
import cookieParser from 'cookie-parser';
import { getRepository } from 'typeorm';

import router from './api/router';

import { ChatRoom } from './db/ChatRoom';
import { ChatMessage } from './db/ChatMessage';
import { User } from './db/User';

let broadcaster: string;

interface ActiveUser {
  name: string;
  socketId: string;
  room: string;
}

export class Server {
  private httpsServer: HTTPSServer;
  private app: Application;
  private io: SocketIOServer;

  private readonly DEFAULT_PORT = process.env.SERVER_PORT || '5000';
  private readonly TLS_CONFIG = {
    cert: fs.readFileSync(path.resolve('cert/', 'localhost.crt')),
    key: fs.readFileSync(path.resolve('cert/', 'localhost.key')),
  };

  constructor() {
    this.initialize();

    this.handleRoutes();
  }

  private initialize(): void {
    this.app = express();
    this.httpsServer = createServer(this.TLS_CONFIG, this.app);
    this.io = socketIO(this.httpsServer);

    this.configure();
    this.handleRoutes();
    this.handleSocketConnection();
  }

  private configure(): void {
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '../../client/dist')));
    this.app.use('/*/app', express.static(path.join(__dirname, '../../client/dist/app')));
    this.app.use('/*/styles', express.static(path.join(__dirname, '../../client/dist/styles')));
  }

  private handleRoutes(): void {
    // handle api routes
    this.app.use('/api', router);

    // handle login route
    this.app.get('/login', (req, res) => {
      // try to get URT cookie
      const URT: string | undefined = req.cookies.URT;

      if (URT) {
        // try to refresh tokens if got URT
        res.redirect(307, '/access');
      } else {
        // serve client
        res.sendFile(path.join(__dirname + '../../../client/dist/index.html'));
      }
    });

    // handle register route
    this.app.get('/register', (req, res) => {
      // try to get UAT or URT from header / cookie
      const URT: string | undefined = req.cookies.URT;

      if (URT) {
        // try to refresh tokens if got URT
        res.redirect(307, '/access');
      } else {
        // serve client
        res.sendFile(path.join(__dirname + '../../../client/dist/index.html'));
      }
    });

    // handles any requests that don't match the ones above
    this.app.get('*', (_, res) => {
      // serve client
      res.sendFile(path.join(__dirname + '../../../client/dist/index.html'));
    });
  }

  private handleSocketConnection(): void {
    let io = this.io;
    let activeUsers: ActiveUser[] = [];

    io.sockets.on('connection', socket => {
      socket.on('broadcaster', () => {
        broadcaster = socket.id;
        socket.broadcast.emit('broadcaster');
      });
      socket.on('watcher', () => {
        broadcaster && socket.to(broadcaster).emit('watcher', socket.id);
      });
      socket.on('offer', (id /* of the watcher */, message) => {
        socket.to(id).emit('offer', socket.id /* of the broadcaster */, message);
      });
      socket.on('answer', (id /* of the broadcaster */, message) => {
        socket.to(id).emit('answer', socket.id /* of the watcher */, message);
      });
      socket.on('candidate', (id, message) => {
        socket.to(id).emit('candidate', socket.id, message);
      });
      socket.on('disconnect', () => {
        broadcaster && socket.to(broadcaster).emit('bye', socket.id);
      });

      socket.on('join', ({ room, name }) => {
        socket.join(room);
        console.log(name + ' joined room ' + room);

        const existingUser = activeUsers.find(activeUser => activeUser.name === name);

        if (!existingUser) {
          activeUsers.push({ socketId: socket.id, name: name, room: room });
        }

        io.to(room).emit('join', { room, name, activeUsers: activeUsers });
      });

      socket.on('message', async ({ chatRoomId, senderName, text, createdAt }) => {
        const chatRoomRepository = getRepository(ChatRoom);

        // try to find chat room
        const chatRoom = await chatRoomRepository
          .createQueryBuilder('c')
          .select(['c.id', 'c.name', 'o', 'c.token', 'm'])
          .where('c."id" = :id', { id: chatRoomId })
          .leftJoinAndSelect('c.owner', 'o')
          .leftJoinAndSelect('c.members', 'm')
          .getOne();

        const user = await User.findOne({ where: { name: senderName } });

        if (chatRoom && user) {
          const sender =
            chatRoom.owner.id === user.id
              ? chatRoom.owner
              : chatRoom.members?.find(member => member.id === user.id);

          if (sender) {
            const chatMessage = ChatMessage.create({
              chat_room: chatRoom,
              sender: sender,
              text: text,
              created_at: createdAt,
            });

            await chatMessage.save();

            console.log(senderName + ' messaged: ' + text);
            io.to(chatRoomId).emit('message', { chatRoomId, senderName, text, createdAt });
          }
        }
      });

      socket.on('exit', ({ room, name }) => {
        console.log(name + ' exited room ' + room);
        activeUsers = activeUsers.filter(existingUser => existingUser.name !== name);
        io.to(room).emit('exit', { room, name, activeUsers: activeUsers });
      });

      socket.on('disconnect', () => {
        activeUsers = activeUsers.filter(activeUser => activeUser.socketId !== socket.id);
        socket.broadcast.emit('remove-user', {
          socketId: socket.id,
        });
      });
    });
  }

  public listen(callback: (port: string) => void): void {
    this.httpsServer.listen(this.DEFAULT_PORT, () => callback(this.DEFAULT_PORT));
  }
}
