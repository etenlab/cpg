import { Repository } from "typeorm";
import { RelationshipPropertyKey } from "../../models/relationship/relationship-property-key.entity";
import { DbService } from "../../services/db.service";

export class RelationshipPropertyKeyRepository {
  repository!: Repository<RelationshipPropertyKey>;

  constructor(private dbService: DbService) {
    this.repository = this.dbService.dataSource.getRepository(RelationshipPropertyKey);
  }

  async createRelationshipPropertyKey(rel_id: string, key_name: string): Promise<string> {
    const property_key = await this.repository.findOne({
      where: {
        relationship_uuid: rel_id,
        property_key: key_name,
      }
    });

    if (property_key) {
      return property_key.relationship_property_key_uuid;
    }

    const new_property_key = await this.repository.save({
      relationship_uuid: rel_id,
      property_key: key_name,
    });

    return new_property_key.relationship_property_key_uuid;
  }
}
