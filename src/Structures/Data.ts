import { Collection } from 'discord.js';
import { Case } from './Case';
import { Config } from './Config';
import CaseModel from '../Models/Case';
export class Data extends Collection<any, any> {
  public constructor() {
    super();
  };
};
export class CaseStore extends Collection<string, Case> {
  public constructor() {
    super();
  };
  public async recent(id: string): Promise<Case> {
    var cases = this.filter(a => a.id === id),
      _case: any = cases.size >= 1 ? cases.sort((a, b) => b.time - a.time).first() : false;
    if(!_case) _case = <Case[]> [].concat(await CaseModel.find({ id })).sort((a, b) => b.time - a.time)[0];
    return _case;
  };
};
export class ConfigStore extends Collection<string, Config> {
  public constructor() {
    super();
  };
};