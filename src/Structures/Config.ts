import ConfigModel from '../Models/Config';
import { throws } from 'assert';
export interface ConfigOptions {
  id: string;
  log?: string;
};
export class Config {
  public id!: string;
  public log!: string;
  public constructor(ops: ConfigOptions) {
    Object.assign(this, ops);
  };
  public async save() {
    const config = await new ConfigModel({
      id: this.id,
      log: this.log || ''
    }).save();

    console.log(`[Guild Join] -> ${this.id}`);
    return this;
  };
};