import { Collection } from 'discord.js';
import { Case } from './Case';
export class Data extends Collection<any, any> {
  public constructor() {
    super();
  };
};
export class CaseStore extends Data {
  public constructor() { super(); };
  public recent(num: number): Case {
    const recents = this.sort((a, b) => a.time - b.time);
    return <any> recents.first(num);
  };
};