import { PermissionResolvable } from "discord.js";

export interface CommandOptions {
  name: string;
  description: string;
  usage: string;
  aliases: string[];
  category: string;
  senderPerms: PermissionResolvable[];
  clientPerms: PermissionResolvable[];
  ownerOnly: boolean;
};
export class Command implements CommandOptions {
  public name: string;
  public description: string;
  public usage: string;
  public aliases: string[];
  public category: string;
  public senderPerms: PermissionResolvable[];
  public clientPerms: PermissionResolvable[];
  public ownerOnly: boolean;
  constructor(ops: CommandOptions) {
    Object.assign(this, ops);
  };
};