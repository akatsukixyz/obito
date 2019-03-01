import { Event } from '../Structures/Event';
import { Obito } from '../Structures/Client';
import { Message } from 'discord.js';
module.exports = class MessageEvent extends Event {
    constructor() { 
        super({ name: 'message'}); 
    };
    async execute(client: Obito, message: Message) {
        if (message.author.bot) return;
        if(!message.content.trim().toLowerCase().startsWith(`-`)) return;
        const args = message.content.trim().slice(1).split(/\s+/g),
            command = args.shift().toLowerCase(),
            cmd = client.commands.get(command);
        
        if(!cmd) return;
 
        if(cmd.ownerOnly && !client.ops.owners.some(o => message.author.id === o)) return;
 
        if(!cmd.clientPerms.some(p => message.guild.me.hasPermission(p))) return message.channel.send(`Error: I need the \`${cmd.clientPerms.join('`, `')}\` permissions to use this command`);
        if(!cmd.senderPerms.some(p => message.member.hasPermission(p))) return message.channel.send(`Error: You require the \`${cmd.senderPerms.join('`, `')}\` permissions to use this command`);
        
        try { return cmd.execute(message, args); }
        catch(e) { await message.channel.send('Something went wrong...'); return console.log(e); };
    };
};