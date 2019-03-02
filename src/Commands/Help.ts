import { Command } from '../Structures/Command';
import { Obito } from '../Structures/Client';
import { Message, MessageEmbed } from 'discord.js';

module.exports = class Help extends Command {
  public client!: Obito;
  public constructor(client: Obito) {
    super({
      name: 'Help',
      description: 'Help command',
      usage: '`-help`',
      aliases: ['h', 'commands'],
      category: 'misc',
      senderPerms: ['SEND_MESSAGES'],
      clientPerms: ['SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJIS'],
      ownerOnly: false
    });
    this.client = client;
  };
  async execute(message: Message, args: string[]) {
    async function sendNormal(message: Message, client: Obito, color: string){
      const embed = new MessageEmbed()
        .setAuthor(`Help`, message.guild.iconURL())
        .setColor(color);
      const categoriesMap: {[key: string]: string[]} = {};
      for (const command of client.commands.array()) {
        const { category } = command;
        if (!(category in categoriesMap)) categoriesMap[category] = [];
        if(!categoriesMap[category].includes(command.name)) categoriesMap[category].push(command.name);
      }
      for (const category in categoriesMap) embed.addField(category.replace(category[0], category[0].toUpperCase()), `\`${categoriesMap[category].join('`, `')}\``, true);
      return message.channel.send(embed);
    };
    if(args[0]) {
      const cmd: Command = this.client.commands.get(args[0].toLowerCase());
      if(!cmd) return sendNormal(message, this.client, '#DC1B5F');
      const embed = new MessageEmbed()
        .setAuthor(`Help: ${cmd.name}`, message.guild.iconURL())
        .addField(`Description`, cmd.description, true)
        .addField(`Usage`, cmd.usage, true)
        .addField(`Aliases`, `\`${cmd.aliases.join('`, `')}\``, true)
        .addField(`Category`, cmd.category, true)
        .addField(`Sender Permissions`, `\`${cmd.senderPerms.join('`,`')}\``, true)
        .addField(`Client Permissions`, `\`${cmd.clientPerms.join('`,`')}\``, true)
        .setColor('#DC1B5F');
      return message.channel.send(embed);
    };
    return sendNormal(message, this.client, '#DC1B5F');
  };
};