import { MessageEmbed, User } from 'discord.js';
import CaseModel from '../Models/Case';

export interface embedOptions {
  action: string;
  user: User;
  staff: User;
};

export interface CaseType {
  id: string;
  type: string;
  case: number;
  reason: string,
  user: string,
  staff: string,
  locked: boolean,
  time: number;
  wiped: boolean;
};

export class Case implements CaseType {
  public id!: string;
  public type!: string;
  public case!: number;
  public reason!: string;
  public user!: string;
  public staff!: string;
  public locked!: boolean
  public time!: number;
  public wiped!: boolean;
  public channel!: string;
  public message!: string;
  public constructor(data: CaseType) {
    this.setup(data);
  };
  private setup(data: CaseType): Case {
    this.id = data.id;
    this.type = data.type;
    this.case = data.case;
    this.reason = data.reason || `No reason specified. Set one using \`-reason ${this.case} [...reason]\``;
    this.user = data.user;
    this.staff = data.staff;
    this.locked = data.locked;
    this.time = data.time || new Date(data.time).getTime();
    return this;
  };
  public setCaseNum(num: number): Case {
    this.case = num;
    return this;
  };
  public setReason(reason: string): Case {
    this.reason = reason;
    return this;
  };
  public get isLocked(): boolean {
    return this.locked;
  };
  public set lock(bool: boolean) {
    this.locked = bool;
  };
  public embed(embedOptions: embedOptions) {
    const embed = new MessageEmbed()
      .setAuthor(`${embedOptions.action} | ${embedOptions.user.tag}`, `${embedOptions.user.displayAvatarURL()}`)
      .setDescription(
        `\`Case #${this.case}\`\n
        User: \`${embedOptions.user.tag} (${embedOptions.user.id})\`\n
        Staff: \`${embedOptions.staff.tag} (${embedOptions.staff.id})\`\n
        Reason: \`${this.reason}\``)
      .setTimestamp(this.time);
    return embed;
  };
  public async save() {
    await new CaseModel({
      id: this.id,
      type: this.type,
      case: this.case,
      reason: this.reason,
      user: this.user,
      staff: this.staff,
      locked: this.locked,
      timestamp: this.time
    }).save();
    return this;
  } 
};
export interface warn extends CaseType {};
export class Warn extends Case implements warn {
  public id!: string;
  constructor(data: warn) {
    super(data);
  };
};
export interface kick extends CaseType {};
export class Kick extends Case implements kick {

};
export interface ban extends CaseType {
  duration: number;
};
export class Ban extends Case implements ban {
  public duration: number;
  constructor(data: ban) { 
    super(data);
   };
};
export interface softban extends CaseType {
  duration: number;
};
export class Softban extends Case implements softban {
  public duration: number;
  constructor(data: softban) { 
    super(data);
   };
};
export interface mute extends CaseType {
  duration: number;
};
export class Mute extends Case implements mute {
  public duration: number;
  constructor(data: mute) { 
    super(data);
   };
};
