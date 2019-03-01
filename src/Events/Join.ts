import { Event } from '../Structures/Event';
import { Obito } from '../Structures/Client';
import { Message } from 'discord.js';
module.exports = class MessageEvent extends Event {
    constructor() { 
        super({ name: 'guildCreate'}); 
    };
    async execute(client: Obito, message: Message) {

    };
  };