import fs from 'fs';
import path from 'path';
import { createServer, Server as HTTPSServer } from 'https';
import express, { Application } from 'express';
import socketIO, { Server as SocketIOServer } from 'socket.io';
import cookieParser from 'cookie-parser';

import router from './api/router';

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
    this.io.on('connection', socket => {
      console.log('Socket connected. ' + socket);
    });
  }

  public listen(callback: (port: number) => void): void {
    this.httpsServer.listen(this.DEFAULT_PORT, () => callback(this.DEFAULT_PORT));
  }
}
