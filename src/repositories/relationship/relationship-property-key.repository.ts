import { nanoid } from 'nanoid';
import { RelationshipPropertyKey } from '../../models/relationship/relationship-property-key.entity';
import { DbService } from '../../services/db.service';
import { SyncService } from '../../services/sync.service';

export class RelationshipPropertyKeyRepository {
  constructor(private dbService: DbService, private syncService: SyncService) {}

  private get repository() {
    return this.dbService.dataSource.getRepository(RelationshipPropertyKey);
  }

  async createRelationshipPropertyKey(
    rel_id: string,
    key_name: string,
  ): Promise<string | undefined> {
    const relationship_property_key = await this.repository.save({
      id: nanoid(),
      relationship_id: rel_id,
      property_key: key_name,
      sync_layer: this.syncService.syncLayer,
    } as RelationshipPropertyKey);

    return relationship_property_key.id;
  }
}
