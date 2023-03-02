import { nanoid } from 'nanoid';
import { RelationshipPropertyValue } from '../../models/relationship/relationship-property-value.entity';
import { DbService } from '../../services/db.service';
import { SyncService } from '../../services/sync.service';

export class RelationshipPropertyValueRepository {
  constructor(private dbService: DbService, private syncService: SyncService) {}

  private get repository() {
    return this.dbService.dataSource.getRepository(RelationshipPropertyValue);
  }

  async createRelationshipPropertyValue(
    key_id: string,
    key_value: any,
  ): Promise<string | undefined> {
    const relationship_property_value = await this.repository.save({
      id: nanoid(),
      relationship_property_key_id: key_id,
      property_value: JSON.stringify({ value: key_value }),
      sync_layer: this.syncService.syncLayer,
    } as RelationshipPropertyValue);

    return relationship_property_value.id;
  }
}
