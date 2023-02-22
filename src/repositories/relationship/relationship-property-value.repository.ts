import { Repository } from "typeorm";
import { RelationshipPropertyValue } from "../../models/relationship/relationship-property-value.entity";
import { DbService } from "../../services/db.service";

export class RelationshipPropertyValueRepository {
  repository!: Repository<RelationshipPropertyValue>;

  constructor(private dbService: DbService) {
    this.repository = this.dbService.dataSource.getRepository(RelationshipPropertyValue);
  }

  async createRelationshipPropertyValue(key_id: string, key_value: any): Promise<string | undefined> {
    const relationship_property_value = await this.repository.save({
      relationship_property_key_uuid: key_id,
      property_value: key_value,
    });

    return relationship_property_value.relationship_property_value_uuid;
  }
}
