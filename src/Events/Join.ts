import { Event } from '../Structures/Event';
import { Obito } from '../Structures/Client';
import { Guild } from 'discord.js';
import { Config } from '../Structures/Config';
module.exports = class MessageEvent extends Event {
  constructor() { 
      super({ name: 'guildCreate'}); 
  };
  async execute(client: Obito, guild: Guild) {
   await new Config({ id: guild.id }).save();
  };
};