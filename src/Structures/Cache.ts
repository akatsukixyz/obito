import { CaseStore, ConfigStore } from './Data';
import CaseModel from '../Models/Case';
import { Case } from './Case';
import { Config } from './Config';
import ConfigModel from '../Models/Config';

export interface CacheOptions {
  storeAll: boolean
};
export class CacheManager {
  public Cases!: CaseStore;
  public Configs!: ConfigStore;
  constructor(ops: CacheOptions) {
    this.Cases = new CaseStore();
    this.Configs = new ConfigStore();
    if(ops.storeAll) this.cacheAll();
  };
  public async cacheAll() {
    this.Cases = new CaseStore();
    this.Configs = new ConfigStore();
    const cases = <Case[]> [].concat(await CaseModel.find());
    for (const elem of cases)
      this.Cases.set(`${elem.id}-${elem.case}`, new Case(elem));
    console.log(`Cached ${this.Cases.size}/${cases.length} cases.`);
    const configs = <Config[]> [].concat(await ConfigModel.find());
    for (const elem of configs)
      this.Configs.set(`${elem.id}`, new Config(elem));
    console.log(`Cached ${this.Configs.size}/${configs.length} configs.`);
  };
};