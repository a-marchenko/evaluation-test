// Utils
import chalk from 'chalk';

// Server
import { Server } from './server';
import { createConnection } from 'typeorm';

// DB entities
import { User } from './db/User';
import { ChatRoom } from './db/ChatRoom';
import { ChatMessage } from './db/ChatMessage';

const startServer = async () => {
  const entities = [User, ChatRoom, ChatMessage];

  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'chat_app_owner',
    password: 'chat_app_owner_password',
    database: 'chat_app',
    synchronize: true,
    logging: false,
    entities: entities,
    migrations: ['migration/*.js'],
    subscribers: ['subscriber/*.js'],
  });

  const server = new Server();

  server.listen(port => {
    console.log(
      chalk.magentaBright('\n🚀  Server ready at: ') +
        chalk.blueBright(`https://localhost:${port}\n`),
    );
  });
};

startServer();
