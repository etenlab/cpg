import { nanoid } from 'nanoid';
import { NodePropertyValue } from '../../models/node/node-property-value.entity';
import { DbService } from '../../services/db.service';
import { SyncService } from '../../services/sync.service';

export class NodePropertyValueRepository {
  constructor(private dbService: DbService, private syncService: SyncService) {}

  private get repository() {
    return this.dbService.dataSource.getRepository(NodePropertyValue);
  }

  async createNodePropertyValue(
    key_id: string,
    key_value: any,
  ): Promise<string | undefined> {
    const node_property_value = await this.repository.save({
      id: nanoid(),
      node_property_key_id: key_id,
      property_value: JSON.stringify({ value: key_value }),
      sync_layer: this.syncService.syncLayer,
    } as NodePropertyValue);

    return node_property_value.id;
  }
}
