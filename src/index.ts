import { ShardingManager } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();
const manager = new ShardingManager('./Obito.js', { token: process.env.TOKEN, totalShards: 'auto' });
manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));