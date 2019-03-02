import ConfigModel from '../Models/Config';
export interface ConfigOptions {
  id: string;
  log?: string;
};
export class Config {
  public id!: string;
  public log!: string;
  public constructor(ops: ConfigOptions) {
    this.id = ops.id;
    if(ops.log) this.log = ops.log;
  };
  public async save() {
    await new ConfigModel({
      id: this.id,
      log: this.log || ''
    }).save();
    console.log(`[Guild Join] -> ${this.id}`);
    return this;
  };
};