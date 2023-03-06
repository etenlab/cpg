import { Repository } from 'typeorm';
import { RelationshipType } from '../../models/relationship/relationship-type.entity';
import { DbService } from '../../services/db.service';

export class RelationshipTypeRepository {
  repository!: Repository<RelationshipType>;

  constructor(private dbService: DbService) {
    this.repository = this.dbService.dataSource.getRepository(RelationshipType);
  }

  async createRelationshipType(type_name: string): Promise<string> {
    const relationship_type = await this.repository.save({
      type_name,
    });

    return relationship_type.type_name;
  }

  async listRelationshipTypes(): Promise<RelationshipType[]> {
    const relationship_types = await this.repository.find({
      select: ['type_name'],
    });

    return relationship_types;
  }
}
