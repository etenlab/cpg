import { Repository } from "typeorm";
import { Relationship } from "../../models";
import { RelationshipPropertyKey } from "../../models/relationship/relationship-property-key.entity";
import { DbService } from "../../services/db.service";

export class RelationshipPropertyKeyRepository {
  repository!: Repository<RelationshipPropertyKey>;

  constructor(private dbService: DbService) {
    this.repository = this.dbService.dataSource.getRepository(
      RelationshipPropertyKey
    );
  }

  async createRelationshipPropertyKey(
    rel_id: string,
    key_name: string
  ): Promise<string | null> {
    const property_key = await this.repository
      .createQueryBuilder("relPropertyKey")
      .where("relPropertyKey.relationship_uuid = :rel_id", { rel_id })
      .andWhere("relPropertyKey.property_key = :key_name", { key_name })
      .getOne();

    if (property_key) {
      return property_key.id;
    }

    const relationship = await this.dbService.dataSource
      .getRepository(Relationship)
      .findOneBy({
        id: rel_id,
      });

    if (!relationship) {
      return null;
    }

    const new_property_key_instance = this.repository.create({
      property_key: key_name,
    });

    new_property_key_instance.relationship = relationship;

    const new_property_key = await this.repository.save(
      new_property_key_instance
    );

    return new_property_key.id;
  }
}
