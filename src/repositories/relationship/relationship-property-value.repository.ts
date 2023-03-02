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
      relationship_property_value_uuid: nanoid(),
      relationship_property_key_uuid: key_id,
      property_value: key_value,
      sync_layer: this.syncService.syncLayer,
    });

    return relationship_property_value.relationship_property_value_uuid;
  }
}
