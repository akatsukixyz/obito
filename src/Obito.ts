import { Obito } from './Structures/Client';
import { config } from 'dotenv';
config();
const client = new Obito({
  token: process.env.TOKEN, 
  commandsDir: './Commands',
  eventsDir: './Events',
  owners: ['517016133694521374']
}, {});
client.start();
client.on('error', client.logger.log);
// process.on('unhandledRejection', client.logger.log);