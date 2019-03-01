import { Event } from '../Structures/Event';
import { Obito } from '../Structures/Client';
module.exports = class ReadyEvent extends Event {
  constructor() {
    super({ name: 'ready' });
  };
  async execute(client: Obito) {
    console.log(`[Ready] -> Logged in as ${client.user.tag} with ${client.shard.count} shards`);
  }; 
};