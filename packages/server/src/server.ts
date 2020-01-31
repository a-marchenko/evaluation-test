import fs from 'fs';
import path from 'path';
import url from 'url';
import { createServer, Server as HTTPSServer } from 'https';
import express, { Application } from 'express';
import socketIO, { Server as SocketIOServer } from 'socket.io';
import cookieParser from 'cookie-parser';

import router from './router';

export class Server {
  private httpsServer: HTTPSServer;
  private app: Application;
  private io: SocketIOServer;

  private readonly DEFAULT_PORT = 5000;
  private readonly TLS_CONFIG = {
    cert: fs.readFileSync(path.resolve('cert/', 'localhost.crt')),
    key: fs.readFileSync(path.resolve('cert/', 'localhost.key')),
  };

  constructor() {
    this.initialize();

    this.handleRoutes();
    this.handleSocketConnection();
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
  }

  private handleRoutes(): void {
    // handles api requests
    this.app.use('/api/', router);

    // handle login route
    this.app.use('/login', (req, res) => {
      const URT: string = req.cookies.URT;
      if (URT) {
        res.redirect('/home');
      } else {
        res.sendFile(path.join(__dirname + '../../../client/dist/index.html'));
      }
    });

    // handle login route
    this.app.use('/register', (req, res) => {
      const URT: string = req.cookies.URT;
      if (URT) {
        res.redirect('/home');
      } else {
        res.sendFile(path.join(__dirname + '../../../client/dist/index.html'));
      }
    });

    // handles access route
    this.app.get('/access', (req, res) => {
      // try to get UAT or URT from header / cookie
      const UAT: string | undefined = req.headers.authorization?.split(' ')[1];
      const URT: string | undefined = req.cookies.URT;

      if (URT && UAT) {
        // if all tokens found redirect to home
        res.redirect('/home');
      } else if (!URT) {
        // if no URT found redirect to login
        res.redirect('/login');
      } else {
        // if got URT send files
        res.sendFile(path.join(__dirname + '../../../client/dist/index.html'));
      }
    });

    // handles any requests that don't match the ones above
    this.app.get('*', (req, res) => {
      // try to get UAT or URT from header / cookie
      const UAT: string | undefined = req.headers.authorization?.split(' ')[1];
      const URT: string | undefined = req.cookies.URT;

      if (!URT && !UAT) {
        // if no tokens found redirect to login
        res.redirect('/login');
      } else if (!UAT) {
        // try to refresh tokens if no UAT found but got URT
        res.redirect(
          307,
          url.format({
            pathname: '/access',
            query: {
              target: req.path,
            },
          }),
        );
      } else {
        // all ok send files
        res.sendFile(path.join(__dirname + '../../../client/dist/index.html'));
      }
    });
  }

  private handleSocketConnection(): void {
    this.io.on('connection', socket => {
      console.log('Socket connected. ' + socket);
    });
  }

  public listen(callback: (port: number) => void): void {
    this.httpsServer.listen(this.DEFAULT_PORT, () => callback(this.DEFAULT_PORT));
  }
}
