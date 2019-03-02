import { Command } from '../Structures/Command';
import { Obito } from '../Structures/Client';
import { Message, MessageEmbed } from 'discord.js';
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
    const embed = new MessageEmbed()
      .setAuthor(`Stats`, this.client.user.displayAvatarURL())
      .addField(`CPU`, `${this.client.usage.PERCENT}%`, true)
      .addField(`Memory`, `${this.client.usage.USED}/${this.client.usage.TOTAL} MB (${this.client.usage.MEM}%)`, true)
      .addField(`Shard`, `#${<number>this.client.shard.id + 1}/${this.client.shard.count}`, false)
      .setColor(this.client.color)
      .setFooter(this.client.usage.CPU);
    return message.channel.send(embed);
  };
};