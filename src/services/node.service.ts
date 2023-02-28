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
    this.relationshipRepo = new RelationshipRepository(dbService);
    this.relationshipPropertyKeyRepo = new RelationshipPropertyKeyRepository(dbService);
    this.relationshipPropertyValueRepo = new RelationshipPropertyValueRepository(dbService);
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

  async createRelationshipFromObject(type_name: string, obj: Object, from_node: string | undefined, to_node: string | undefined): Promise<string | null> {
    if (from_node === undefined || to_node === undefined) {
      return null;
    }

    const relationship = await this.relationshipRepo.createRelationship(from_node, to_node, type_name);
    Object.entries(obj).forEach(async ([key, value]) => {
      const property_key_uuid = await this.relationshipPropertyKeyRepo.createRelationshipPropertyKey(relationship.relationship_uuid, key);
      await this.relationshipPropertyValueRepo.createRelationshipPropertyValue(property_key_uuid, value);
    });

    return relationship.relationship_uuid;
  }

  async createRelatedFromNodeToObject(node_uuid: string, node_type_name: string, rel_type_name: string, obj: {}) {
    const to_node = await this.nodeRepo.readNode(node_uuid);
    if (!to_node) {
      return null;
    }

    const from_node_uuid = await this.createNodeFromObject(node_type_name, obj);
    const relationship = await this.relationshipRepo.createRelationship(from_node_uuid, node_uuid, rel_type_name);

    const from_node = await this.nodeRepo.readNode(from_node_uuid);
    return {
      relationship: relationship,
      node: from_node,
    };
  }

  async createRelatedToNodeFromObject(node_uuid: string, node_type_name: string, rel_type_name: string, obj: {}) {
    const from_node = await this.nodeRepo.readNode(node_uuid);
    if (!from_node) {
      return null;
    }

    const to_node_uuid = await this.createNodeFromObject(node_type_name, obj);
    const relationship = await this.relationshipRepo.createRelationship(node_uuid, to_node_uuid, rel_type_name);

    const to_node = await this.nodeRepo.readNode(to_node_uuid);
    return {
      relationship: relationship,
      node: to_node,
    };
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

  // Layer 3

  async createTable(name: string): Promise<Table | null> {
    const node_uuid = await this.createNodeFromObject('table', { name: name });
    const node:Table | null  = await this.nodeRepo.readNode(node_uuid);
    return node;
  }

  async getTable(name: string): Promise<Table | null> {
    const property_values = await this.nodePropertyValueRepo.repository.find({
      where: {
        property_value: name,
      }
    });
    let node: Table | null = null;
    for (const val of property_values) {
      const property_key = await this.nodePropertyKeyRepo.repository.findOneBy({ node_uuid: val.node_property_key_uuid });
      if (property_key) {
        node = await this.nodeRepo.readNode(property_key.node_uuid);
      }
    }

    return node;
  }

  async addTableData(table_name: string, column_name: string, row_id: string, cell_data: any): Promise<TableCell | null> {
    const table = await this.getTable(table_name);
    const table_cell_uuid = await this.createNodeFromObject('table-cell', {
      column: column_name,
      row: row_id,
      data: cell_data,
    });
    const table_cell = await this.nodeRepo.readNode(table_cell_uuid);
    this.createRelationshipFromObject('parent', {}, table?.node_uuid, table_cell_uuid);

    return table_cell;
  }
}

export class Table extends Node {
}

export class TableCell extends Node {
}