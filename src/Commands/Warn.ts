import { Command } from '../Structures/Command';
import { Obito } from '../Structures/Client';
import { Message } from 'discord.js';
module.exports = class Test extends Command {
  public client!: Obito;
  constructor(client: Obito) {
    super({
      name: 'warn',
      description: 'Warn command',
      usage: `\`-warn [user] [...reason]\``,
      aliases: ['`w`'],
      category: 'mod',
      senderPerms: ['MANAGE_MESSAGES'],
      clientPerms: ['SEND_MESSAGES'],
      ownerOnly: false
    });
    this.client = client;
  };
  async execute(message: Message, args: string[]) {
    return message.channel.send('hi');
  };
};