import { Repository } from 'typeorm';
import { RelationshipPropertyKey } from '../../models';
import { RelationshipPropertyValue } from '../../models/relationship/relationship-property-value.entity';
import { DbService } from '../../services/db.service';

export class RelationshipPropertyValueRepository {
  repository!: Repository<RelationshipPropertyValue>;

  constructor(private dbService: DbService) {
    this.repository = this.dbService.dataSource.getRepository(
      RelationshipPropertyValue,
    );
  }

  async createRelationshipPropertyValue(
    key_id: string,
    key_value: any,
  ): Promise<string | null> {
    const rel_property_key = await this.dbService.dataSource
      .getRepository(RelationshipPropertyKey)
      .findOneBy({ id: key_id });

    if (!rel_property_key) {
      return null;
    }

    const new_property_value_instance = this.repository.create({
      property_value: key_value,
    });

    new_property_value_instance.property_key = rel_property_key;

    const relationship_property_value = await this.repository.save(
      new_property_value_instance,
    );

    return relationship_property_value.id;
  }
}
