import { Logger } from './Logger';
import { Snowflake, ClientOptions, Client } from 'discord.js';
import { Data } from './Data';
import * as mongoose from 'mongoose';
import { CommandHandler, EventHandler } from './Handlers';
import { CacheManager } from './Cache';
export interface ObitoOptions {
  token: string;
  owners: string[];
  commandsDir: string;
  eventsDir: string;
  color: string;
};
export enum ClientStates {
  NONE = 'none',
  INIT = 'init',
  READY = 'ready',
  START = 'start'
};
export interface ClientUsage {
  CPU: string;
  USED: number;
  TOTAL: number;
  MEM: string;
  PERCENT: string;
};

export class Obito extends Client {
  public logger!: Logger;
  public cache!: CacheManager;
  public connection;
  public commands!: Data;
  public ops!: ObitoOptions;
  public cmdhandler!: CommandHandler;
  public evhandler!: EventHandler;
  public state!: ClientStates;
  public usage!: ClientUsage;
  public usageUpdates!: any;
  public color!: string;
  public constructor(options: ObitoOptions, clientopts: ClientOptions) {
    super(clientopts);
    this.logger = new Logger(this);
    this.cache = new CacheManager({ storeAll: true });
    this.commands = new Data();
    if(!options.token) throw new Error(`No token specified.`);
    if(!options.owners || (options.owners && !options.owners.length)) console.log(`No owner set. Owner-only settings will not take effect.`);
    if(options.owners && (options.owners.some(o => isNaN(Number(o))) || options.owners.some(o => o.length < 16) || options.owners.some(o => o.length > 18))) {
      console.log(`Invalid owners provided.`);
      options.owners = null;
    };
    this.ops = options;
    this.color = options.color;
    this.state = ClientStates.NONE;
    this._init();
  };
  public async Cache(): Promise<void> {
    if(!this.connection) throw new Error('A postgres connection is not established.');
  };
  private async _init(): Promise<void> {
    try {
      this.connection = await mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useFindAndModify: false
      });
    } catch(e) { throw new Error(e); };
    this.cmdhandler = await new CommandHandler(this).load();
    this.evhandler = await new EventHandler(this).load();
    if(!this.cmdhandler || !this.evhandler) throw new Error('An error occurred while loading the handlers...');
    this.state = ClientStates.INIT;
  };
  public async start(): Promise<void> {
    if(!this.ops.token) throw new Error(`No token provided.`);
    try { await this.login(this.ops.token); }
    catch(e) { console.log(e); };
    this.state = ClientStates.START;
  };
};