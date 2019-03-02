import { Command } from '../Structures/Command';
import { Obito } from '../Structures/Client';
import { Message } from 'discord.js';
module.exports = class Info extends Command {
  public client!: Obito;
  constructor(client: Obito) {
    super({
      name: 'Info',
      description: 'Info command',
      usage: `\`-info\``,
      aliases: ['stats'],
      category: 'misc',
      senderPerms: ['SEND_MESSAGES'],
      clientPerms: ['SEND_MESSAGES'],
      ownerOnly: false
    });
    this.client = client;
  };
  async execute(message: Message, args: string[]) {
    return message.channel.send(`${this.client.state}`);
  };
};