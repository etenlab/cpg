import { nanoid } from 'nanoid';
import { NodePropertyKey } from '../../models/node/node-property-key.entity';
import { DbService } from '../../services/db.service';
import { SyncService } from '../../services/sync.service';

export class NodePropertyKeyRepository {
  constructor(private dbService: DbService, private syncService: SyncService) {}

  private get repository() {
    return this.dbService.dataSource.getRepository(NodePropertyKey);
  }

  async createNodePropertyKey(
    node_id: string,
    key_name: string,
  ): Promise<string | undefined> {
    const node_property_key = await this.repository.save({
      node_property_key_uuid: nanoid(),
      node_uuid: node_id,
      property_key: key_name,
      sync_layer: this.syncService.syncLayer,
    });

    return node_property_key.node_property_key_uuid;
  }
}
