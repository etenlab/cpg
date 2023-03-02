import { Relationship } from '../../models/relationship/relationship.entity';
import { DbService } from '../../services/db.service';
import { SyncService } from '../../services/sync.service';
import { nanoid } from 'nanoid';

export class RelationshipRepository {
  constructor(private dbService: DbService, private syncService: SyncService) {}

  private get repository() {
    return this.dbService.dataSource.getRepository(Relationship);
  }

  async createRelationship(
    node_1: string,
    node_2: string,
    type_name: string,
  ): Promise<string | undefined> {
    const relationship = await this.repository.save({
      id: nanoid(),
      from_node_id: node_1,
      to_node_id: node_2,
      relationship_type: type_name,
      sync_layer: this.syncService.syncLayer,
    } as Relationship);

    return relationship.id;
  }

  async listAllRelationshipsByType(type_name: string): Promise<Relationship[]> {
    const relationships = await this.repository.findBy({
      relationship_type: type_name,
    });

    return relationships;
  }

  async readRelationship(rel_id: string): Promise<Relationship | null> {
    const relationship = await this.repository.findOneBy({
      id: rel_id,
    });

    return relationship;
  }

  async listRelatedNodes(node_id: string): Promise<any> {
    const relationships_from = await this.repository.findBy({
      to_node_id: node_id,
    });
    const related_from = relationships_from.map((rel) => {
      return {
        relationship: rel,
        node: rel.from_node,
      };
    });

    const relationships_to = await this.repository.findBy({
      from_node_id: node_id,
    });
    const related_to = relationships_to.map((rel) => {
      return {
        relationship: rel,
        node: rel.to_node,
      };
    });

    return related_from.concat(related_to);
  }
}
