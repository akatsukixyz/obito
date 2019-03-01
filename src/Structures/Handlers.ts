import * as fs from 'fs';
import * as path from 'path';
import { Obito } from './Client';
import { Command } from './Command';

export class CommandHandler {
  private client!: Obito;
  public constructor(client: Obito) { this.client = client; };
  public load(): CommandHandler {
    if(!fs.statSync(path.resolve(this.client.ops.commandsDir)).isDirectory()) throw new Error('No commands folder. Canceling command handler.');
    try { var files = fs.readdirSync(path.resolve(this.client.ops.commandsDir)).filter(f => f.endsWith('.js')); }
    catch(e) { throw new Error(e); };
    if(!files.length) throw new Error(`Warning: No commands loaded.`);
    for (const file of files) {
        const command = new (require(path.resolve(`${this.client.ops.commandsDir}/${file}`)))(this.client);
        this.client.commands.set(command.name.toLowerCase(), command);
        for (const alias of command.aliases) this.client.aliases.set(alias.toLowerCase(), command);
    };
    return this;
  };
  public get(cmd: string): Command {
    if(!this.client.commands.has(cmd)) return null;
    return this.client.commands.get(cmd);
  };
};
export class EventHandler {
  private client!: Obito;
  protected events?: string[];
  constructor(client: Obito) { this.client = client; };
  public load(): EventHandler {
    this.events = [];
    if(!fs.statSync(path.resolve(this.client.ops.eventsDir)).isDirectory()) throw new Error('No events folder. Canceling event handler.');
    try { var files = fs.readdirSync(path.resolve(this.client.ops.eventsDir)).filter(f => f.endsWith('.js')); }
    catch(e) { throw new Error(e); };
    if(!files.length) throw new Error(`Warning: No events loaded.`);
    for (const file of files) {
      const event = new (require(path.resolve(`${this.client.ops.eventsDir}/${file}`)));
      this.client.on(event.name, (...params) => event.execute(this.client, ...params));
      this.events.push(event.name);
    };
    return this;
  };
  public get list() { return this.events; };
};