export interface ConfigOptions {
  _id: string;
  log: string;
};
export class Config {
  public _id!: string;
  public log!: string;
  constructor(ops: ConfigOptions) {
    Object.assign(this, ops);
  };
};