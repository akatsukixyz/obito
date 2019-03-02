import { Case } from "./Case";
import { Obito } from "./Client";
import { TextChannel, PermissionResolvable } from 'discord.js';

interface LoggerInterface {
  types: string[];
};

export class Logger implements LoggerInterface {
  public types!: string[];
  private client!: Obito;
  public constructor(client: Obito) {
    this.client = client;
  };
  public log(...things: any): void { return console.log(...things); };
  public async logCase(_case: Case) {
    const guild = this.client.guilds.get(_case.id);
    if(!guild) return this.log(`[Case Log] -> Invalid guild.`);
    const user = await this.client.users.fetch(_case.user),
      staff = await this.client.users.fetch(_case.staff);
    if(!user || !staff) return this.log(`[Case Log] -> Invalid user/staff member.`);
    const config = this.client.cache.Configs.get(guild.id);
    if(!config.log) return this.log(`[Case Log] -> No log channel set for ${guild}`);
    const channel = <TextChannel> this.client.channels.get(config.log);
    if(!channel) return this.log(`[Case Log] -> Invalid channel set.`);
    const b: PermissionResolvable[] = ['SEND_MESSAGES', 'EMBED_LINKS'];
    if(!b.some(a => channel.permissionsFor(guild.me).has(a))) return this.log(`[Case Log] -> Insufficient permissions to send log message.`);
    try { await channel.send(_case.embed({ action: _case.type, user: user, staff: staff  })); }
    catch(e) { return console.log(e); };
    this.client.cache.Cases.set(`${_case.id}-${guild.id}`, await _case.save());
  };
};