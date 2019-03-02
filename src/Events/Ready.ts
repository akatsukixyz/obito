import { Event } from '../Structures/Event';
import { Obito, ClientStates, ClientUsage } from '../Structures/Client';
import * as utils from 'node-os-utils';
import { totalmem } from 'os';
module.exports = class ReadyEvent extends Event {
  constructor() {
    super({ name: 'ready' });
  };
  async execute(client: Obito) {
    console.log(`[Ready] -> Logged in as ${client.user.tag} with ${client.shard.count} shards`);
    client.state = ClientStates.READY;
    client.usageUpdates = setInterval(async _ => {
      const cpu = await utils.cpu.usage();
      const { totalMemMb, usedMemMb } = <{totalMemMb: number, usedMemMb: number}>await utils.mem.used();
      client.usage = { 
        CPU: utils.cpu.model(),
        USED: usedMemMb,
        TOTAL: totalMemMb,
        MEM: ((usedMemMb/totalMemMb) * 100).toFixed(1),
        PERCENT: cpu
      };
    }, 5000);
    const cpu = await utils.cpu.usage();
    const { totalMemMb, usedMemMb } = <{totalMemMb: number, usedMemMb: number}>await utils.mem.used();
    client.usage = { 
      CPU: utils.cpu.model(),
      USED: usedMemMb,
      TOTAL: totalMemMb,
      MEM: ((usedMemMb/totalMemMb) * 100).toFixed(1),
      PERCENT: cpu
    };
  }; 
};