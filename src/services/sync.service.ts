import { NodePropertyKey } from '../models/node/node-property-key.entity';
import { NodePropertyValue } from '../models/node/node-property-value.entity';
import { NodeType } from '../models/node/node-type.entity';
import { Node } from '../models/node/node.entity';
import { DbService } from './db.service';
import axios from 'axios';
import { SyncSessionRepository } from '../repositories/sync-session.repository';
import { Relationship } from '../models/relationship/relationship.entity';
import { RelationshipType } from '../models/relationship/relationship-type.entity';
import { RelationshipPropertyKey } from '../models/relationship/relationship-property-key.entity';
import { RelationshipPropertyValue } from '../models/relationship/relationship-property-value.entity';

type SyncTable = {
  entity: any;
  tableName: string;
  pk: string;
};

const syncTables: SyncTable[] = [
  {
    entity: Node,
    tableName: 'node',
    pk: 'node_uuid',
  },
  {
    entity: NodeType,
    tableName: 'node_type',
    pk: 'type_name',
  },
  {
    entity: NodePropertyKey,
    tableName: 'node_property_key',
    pk: 'node_property_key_uuid',
  },
  {
    entity: NodePropertyValue,
    tableName: 'node_property_value',
    pk: 'node_property_value_uuid',
  },
  {
    entity: Relationship,
    tableName: 'relationship',
    pk: 'relationship_uuid',
  },
  {
    entity: RelationshipType,
    tableName: 'relationship_type',
    pk: 'type_name',
  },
  {
    entity: RelationshipPropertyKey,
    tableName: 'relationship_property_key',
    pk: 'relationship_property_key_uuid',
  },
  {
    entity: RelationshipPropertyValue,
    tableName: 'relationship_property_value',
    pk: 'relationship_property_value_uuid',
  },
];

type SyncEntry = {
  table: string;
  rows: any[];
};

const CURRENT_SYNC_LAYER_KEY = 'syncLayer';
const LAST_SYNC_LAYER_KEY = 'lastSyncLayer';
export class SyncService {
  private currentSyncLayer: number;
  private lastLayerSync: number;
  private serverUrl: string;

  constructor(
    private dbService: DbService,
    private syncSessionRepository: SyncSessionRepository,
  ) {
    this.currentSyncLayer = Number(
      localStorage.getItem(CURRENT_SYNC_LAYER_KEY) || '0',
    );

    if (!process.env.REACT_APP_CPG_SERVER_URL)
      throw new Error('REACT_APP_CPG_SERVER_URL not set');
    this.serverUrl = process.env.REACT_APP_CPG_SERVER_URL;

    this.lastLayerSync = Number(localStorage.getItem('lastSync') || '-1');
  }

  get syncLayer() {
    return this.currentSyncLayer;
  }

  incrementSyncCounter() {
    this.currentSyncLayer++;

    console.log(`currentSyncLayer = ${this.currentSyncLayer}`);

    localStorage.setItem(CURRENT_SYNC_LAYER_KEY, String(this.currentSyncLayer));
  }

  setLastSync(value: number) {
    this.lastLayerSync = value;

    console.log(`lastLayerSync = ${this.lastLayerSync}`);

    localStorage.setItem(LAST_SYNC_LAYER_KEY, String(this.lastLayerSync));
  }

  async sync() {
    const toSyncLayer = this.currentSyncLayer;
    const fromSyncLayer = this.lastLayerSync + 1;
    console.log(`Sync: from ${fromSyncLayer} to ${toSyncLayer}`);
    this.incrementSyncCounter();

    const syncData: SyncEntry[] = [];

    for (const table of syncTables) {
      const items = await this.dbService.dataSource
        .getRepository(table.entity)
        .createQueryBuilder()
        .select('*')
        .where('sync_layer >= :fromSyncLayer', {
          fromSyncLayer,
        })
        .andWhere('sync_layer <= :toSyncLayer', {
          toSyncLayer,
        })
        .execute();

      if (!items.length) continue;

      for (const item of items) {
        delete item['sync_layer'];
      }

      syncData.push({
        table: table.tableName,
        rows: items,
      });
    }

    if (!syncData.length) {
      console.log(`Nothing to sync`);
      return null;
    }

    const sessionId = await this.syncSessionRepository.createSyncSession(
      fromSyncLayer,
      toSyncLayer,
    );

    try {
      await this.syncWithServer(syncData);
    } catch (err) {
      await this.syncSessionRepository.completeSyncSession(
        sessionId,
        new Error(String(err)),
      );
      throw err;
    }

    await this.syncSessionRepository.completeSyncSession(sessionId);

    this.setLastSync(toSyncLayer);

    return syncData;
  }

  private async syncWithServer(entries: SyncEntry[]) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('Starting sync...');

    try {
      const response = await axios.post(
        `${this.serverUrl}/sync/to-server`,
        entries,
        {},
      );

      console.log('Starting completed...');

      return response.data;
    } catch (err) {
      console.log('Sync failed');

      throw err;
    }
  }
}
