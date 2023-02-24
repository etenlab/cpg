import { NodePropertyKeyRepository } from "../repositories/node/node-property-key.repository";
import { NodePropertyValueRepository } from "../repositories/node/node-property-value.repository";
import { NodeRepository } from "../repositories/node/node.repository";
import { RelationshipPropertyKeyRepository } from "../repositories/relationship/relationship-property-key.repository";
import { RelationshipPropertyValueRepository } from "../repositories/relationship/relationship-property-value.repository";
import { RelationshipRepository } from "../repositories/relationship/relationship.repository";
import { DbService } from "./db.service";
import { Node } from "../models/node/node.entity";
import { Relationship } from "../models/relationship/relationship.entity";

export class NodeService {
  nodeRepo!: NodeRepository;
  nodePropertyKeyRepo!: NodePropertyKeyRepository;
  nodePropertyValueRepo!: NodePropertyValueRepository;

  relationshipRepo!: RelationshipRepository;
  relationshipPropertyKeyRepo!: RelationshipPropertyKeyRepository;
  relationshipPropertyValueRepo!: RelationshipPropertyValueRepository;

  constructor(dbService: DbService) {
    this.nodeRepo = new NodeRepository(dbService);
    this.nodePropertyKeyRepo = new NodePropertyKeyRepository(dbService);
    this.nodePropertyValueRepo = new NodePropertyValueRepository(dbService);
  }

  // Layer 2

  async createNodeFromObject(type_name: string, obj: Object): Promise<string> {
    const node_uuid = await this.nodeRepo.createNode(type_name);
    Object.entries(obj).forEach(async ([key, value]) => {
      const property_key_uuid = await this.nodePropertyKeyRepo.createNodePropertyKey(node_uuid, key);
      await this.nodePropertyValueRepo.createNodePropertyValue(property_key_uuid, value);
    });

    return node_uuid;
  }

  async createRelationshipFromObject(type_name: string, obj: Object, from_node: string, to_node: string): Promise<string> {
    const relationship = await this.relationshipRepo.createRelationship(from_node, to_node, type_name);
    Object.entries(obj).forEach(async ([key, value]) => {
      const property_key_uuid = await this.relationshipPropertyKeyRepo.createRelationshipPropertyKey(relationship.relationship_uuid, key);
      await this.relationshipPropertyValueRepo.createRelationshipPropertyValue(property_key_uuid, value);
    });

    return relationship.relationship_uuid;
  }

  async createRelatedNodeFromObject(node_uuid: string, rel_type_name: string, obj: {}) {

  }

  async upsertNodeObject(node_uuid: string, obj: Object): Promise<Node | null> {
    const node = await this.nodeRepo.readNode(node_uuid);
    if (!node) {
      return null;
    }
    Object.entries(obj).forEach(async ([key, value]) => {
      const property_key_uuid = await this.nodePropertyKeyRepo.createNodePropertyKey(node.node_uuid, key);
      await this.nodePropertyValueRepo.createNodePropertyValue(property_key_uuid, value);
    });

    return node;
  }

  async upsertRelationshipObject(rel_uuid: string, obj: Object): Promise<Relationship | null> {
    const rel = await this.relationshipRepo.readRelationship(rel_uuid);
    if (!rel) {
      return null;
    }
    Object.entries(obj).forEach(async ([key, value]) => {
      const property_key_uuid = await this.relationshipPropertyKeyRepo.createRelationshipPropertyKey(rel.relationship_uuid, key);
      await this.relationshipPropertyValueRepo.createRelationshipPropertyValue(property_key_uuid, value);
    });

    return rel;
  }

  async upsertRelatedObject(node_uuid: string, rel_type_name: string, obj: {}) {

  }
}
