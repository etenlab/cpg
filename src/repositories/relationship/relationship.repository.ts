import { Repository } from "typeorm";
import { Relationship } from "../../models/relationship/relationship.entity";
import { Node } from "../../models/node/node.entity";
import { DbService } from "../../services/db.service";

export class RelationshipRepository {
  repository!: Repository<Relationship>;

  constructor(private dbService: DbService) {
    this.repository = this.dbService.dataSource.getRepository(Relationship);
  }

  async createRelationship(node_1: string, node_2: string, type_name: string): Promise<Relationship> {
    const relationship = await this.repository.save({
      from_node_uuid: node_1,
      to_node_uuid: node_2,
      relationship_type: type_name,
    });

    return relationship;
  }

  async listAllRelationshipsByType(type_name: string): Promise<Relationship[]> {
    const relationships = await this.repository.findBy({
      relationship_type: type_name,
    });

    return relationships;
  }

  async readRelationship(rel_id: string): Promise<Relationship | null> {
    const relationship = await this.repository.findOneBy({
      relationship_uuid: rel_id,
    });

    return relationship;
  }

  async listRelatedNodes(node_id: string): Promise<any> {
    const relationships_from = await this.repository.findBy({
      to_node_uuid: node_id,
    });
    const related_from = relationships_from.map((rel) => {
      return {
        relationship: rel,
        node: rel.from_node,
      };
    });

    const relationships_to = await this.repository.findBy({
      from_node_uuid: node_id,
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
