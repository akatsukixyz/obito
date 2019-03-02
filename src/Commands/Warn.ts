import { Command } from '../Structures/Command';
import { Obito } from '../Structures/Client';
import { Message } from 'discord.js';
import { Warn } from '../Structures/Case';
module.exports = class Test extends Command {
  public client!: Obito;
  constructor(client: Obito) {
    super({
      name: 'Warn',
      description: 'Warn command',
      usage: `\`-warn [user] [...reason]\``,
      aliases: ['w'],
      category: 'mod',
      senderPerms: ['MANAGE_MESSAGES'],
      clientPerms: ['SEND_MESSAGES'],
      ownerOnly: false
    });
    this.client = client;
  };
  async execute(message: Message, args: string[]) {
    if(!args.length) return message.channel.send(`Error: Incorrect usage. \`-warn [user] [...reason]\``);
    const [, matched] = args[0].match(/^<@!?(\d+)>$/);
    if(!matched) return message.channel.send(`Error: Invalid user.`);
    let user = this.client.users.get(matched) || await this.client.users.fetch(matched) || await message.guild.members.fetch(matched).then(m => m.user);
    if(!user) return message.channel.send(`Error: Invalid user.`);
    message.author = await this.client.users.fetch(message.author.id);
    const _case = await this.client.cache.Cases.recent(message.guild.id) ? await this.client.cache.Cases.recent(message.guild.id).then(c => c.case) + 1 : 1;
    const warn = await new Warn({
      id: message.guild.id,
      type: 'Warn',
      case: _case,
      reason: args.slice(1).join(' '),
      user: user.id,
      staff: message.author.id,
      locked: false,
      time: new Date().getTime(),
      wiped: false
    });
    await this.client.logger.logCase(warn);
    return message.channel.send(`Warned ${user.tag} :white_check_mark:`);
  };
};