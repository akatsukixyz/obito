import { PermissionResolvable } from "discord.js";

export type CommandOptions = {
  name: string,
  description: string,
  usage: string,
  aliases: string[],
  category: string,
  senderPerms: PermissionResolvable[],
  clientPerms: PermissionResolvable[],
  ownerOnly: boolean
};
export class Command {
  constructor(ops: CommandOptions) {
    Object.assign(this, ops);
  };
};