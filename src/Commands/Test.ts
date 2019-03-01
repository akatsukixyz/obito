import { Command } from '../Structures/Command';
import { Obito } from '../Structures/Client';
import { Message } from 'discord.js';
module.exports = class Test extends Command {
  public client!: Obito;
  constructor(client: Obito) {
    super({
      name: 'Test',
      description: 'Test command',
      usage: `\`-test\``,
      aliases: ['`tester`'],
      category: 'misc',
      senderPerms: ['SEND_MESSAGES'],
      clientPerms: ['SEND_MESSAGES'],
      ownerOnly: true
    });
    this.client = client;
  };
  async execute(message: Message, args: string[]) {
    message.channel.send(this.client.ops.owners.some(o => message.author.id === o));
    return message.channel.send('hi');
  };
};