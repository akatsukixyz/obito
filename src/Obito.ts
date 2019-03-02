import { Obito } from './Structures/Client';
import { config } from 'dotenv';
config();
const client = new Obito({
  token: process.env.TOKEN, 
  commandsDir: './Commands',
  eventsDir: './Events',
  owners: ['517016133694521374'],
  color: '#c55c69'
}, {
  messageCacheMaxSize: -1,
  messageCacheLifetime: 0,
  messageSweepInterval: 7200,
  fetchAllMembers: true,
  restWsBridgeTimeout: 10000,
  restTimeOffset: 700,
  restSweepInterval: 240,
  retryLimit: 10,
  disabledEvents: ["TYPING_START"],
  ws: {
    large_threshold: 1000,
    compress: true
  }
});
client.start();
client.on('error', client.logger.log);
// process.on('unhandledRejection', client.logger.log);