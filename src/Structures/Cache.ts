import { CaseStore, Data } from './Data';
import CaseModel from '../Models/Case';
import { Case } from './Case';
import { Config } from './Config';
import ConfigModel from '../Models/Config';
import { Collection } from 'discord.js';

export interface CacheOptions {
  storeAll: boolean
};
export class CacheManager {
  public Cases!: CaseStore;
  public Configs!: Collection<string, Config>;
  constructor(ops: CacheOptions) {
    this.Cases = new CaseStore();
    this.Configs = new Data();
    if(ops.storeAll) this.cacheAll();
  };
  public async cacheAll() {
    const cases = <Case[]> [].concat(await CaseModel.find());
    for await(const elem of cases)
      this.Cases.set(`${elem.id}-${elem.case}`, new Case(elem));
    console.log(`Cached ${cases.length} cases.`);
    const configs = <Config[]> [].concat(await ConfigModel.find());
    for await(const elem of configs)
      this.Configs.set(`${elem.id}`, new Config(elem));
    console.log(`Cached ${configs.length} configs.`);
  };
};