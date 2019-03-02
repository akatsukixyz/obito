import { Command } from '../Structures/Command';
import { Obito } from '../Structures/Client';
import { Message } from 'discord.js';
module.exports = class Info extends Command {
  public client!: Obito;
  constructor(client: Obito) {
    super({
      name: 'Cache',
      description: 'Cache command',
      usage: `\`-cache\``,
      aliases: ['c'],
      category: 'owner',
      senderPerms: ['SEND_MESSAGES'],
      clientPerms: ['SEND_MESSAGES'],
      ownerOnly: true
    });
    this.client = client;
  };
  async execute(message: Message, args: string[]) {
    await this.client.cache.cacheAll();
    return message.channel.send(`Done.`);
  };
};