import { NodePropertyKey } from '../models/node/node-property-key.entity';
import { DbService } from './db.service';

type SyncTable = {
  entity: any;
  pk: string;
};

const syncTables: SyncTable[] = [
  {
    entity: NodePropertyKey,
    pk: 'uuid',
  },
];

export class SyncService {
  private currentSyncCounter: number;
  private lastSync: number;

  constructor(private dbService: DbService) {
    this.currentSyncCounter = Number(
      localStorage.getItem('globalSyncCounter') || '0',
    );

    this.lastSync = Number(localStorage.getItem('lastSync') || '-1');
  }

  get syncLayer() {
    return this.currentSyncCounter;
  }

  incrementSyncCounter() {
    this.currentSyncCounter++;

    localStorage.setItem('globalSyncCounter', String(this.currentSyncCounter));
  }

  async prepareSync() {
    const syncData: {
      key: string;
      rows: any[];
    }[] = [];

    this.incrementSyncCounter();

    for (const table of syncTables) {
      const repository = this.dbService.dataSource.getRepository(table.entity);
      const items = await repository
        .createQueryBuilder()
        .where(['sync_layer > :counter', { counter: this.lastSync }])
        .andWhere([
          'sync_layer <= :counter',
          { counter: this.currentSyncCounter },
        ])
        .getMany();

      syncData.push({
        key: table.pk,
        rows: items,
      });
    }

    return syncData;
  }
}
