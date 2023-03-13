import { NodePropertyKeyRepository } from '../repositories/node/node-property-key.repository';
import { NodePropertyValueRepository } from '../repositories/node/node-property-value.repository';
import { NodeRepository } from '../repositories/node/node.repository';
import { RelationshipPropertyKeyRepository } from '../repositories/relationship/relationship-property-key.repository';
import { RelationshipPropertyValueRepository } from '../repositories/relationship/relationship-property-value.repository';
import { RelationshipRepository } from '../repositories/relationship/relationship.repository';
import { DbService } from './db.service';
import { Node } from '../models/node/node.entity';
import { Relationship } from '../models/relationship/relationship.entity';
import { tableNodeToTable } from '../utils/table';
import { SyncService } from './sync.service';
import { NodePropertyKey, NodePropertyValue, NodeType, RelationshipPropertyKey, RelationshipPropertyValue, RelationshipType } from '../models';

export class NodeService {
  nodeRepo!: NodeRepository;
  nodePropertyKeyRepo!: NodePropertyKeyRepository;
  nodePropertyValueRepo!: NodePropertyValueRepository;

  relationshipRepo!: RelationshipRepository;
  relationshipPropertyKeyRepo!: RelationshipPropertyKeyRepository;
  relationshipPropertyValueRepo!: RelationshipPropertyValueRepository;

  constructor(dbService: DbService, syncService: SyncService) {
    this.nodeRepo = new NodeRepository(dbService, syncService);
    this.nodePropertyKeyRepo = new NodePropertyKeyRepository(
      dbService,
      syncService,
    );
    this.nodePropertyValueRepo = new NodePropertyValueRepository(
      dbService,
      syncService,
    );
    this.relationshipRepo = new RelationshipRepository(dbService, syncService);
    this.relationshipPropertyKeyRepo = new RelationshipPropertyKeyRepository(
      dbService,
      syncService,
    );
    this.relationshipPropertyValueRepo =
      new RelationshipPropertyValueRepository(dbService, syncService);

    // this.createWord("Kij");
    // this.createWord("kij");

    // dbService.dataSource.getRepository(Node).clear();
    // dbService.dataSource.getRepository(NodeType).clear();
    // dbService.dataSource.getRepository(NodePropertyKey).clear();
    // dbService.dataSource.getRepository(NodePropertyValue).clear();
    // dbService.dataSource.getRepository(Relationship).clear();
    // dbService.dataSource.getRepository(RelationshipType).clear();
    // dbService.dataSource.getRepository(RelationshipPropertyKey).clear();
    // dbService.dataSource.getRepository(RelationshipPropertyValue).clear();
  }

  // Layer 2
  async createNodeFromObject(type_name: string, obj: Object): Promise<Node> {
    try {
      const node = await this.nodeRepo.createNode(type_name);
      for (const [key, value] of Object.entries(obj)) {
        const property_key_id =
          await this.nodePropertyKeyRepo.createNodePropertyKey(node.id, key);
        if (property_key_id) {
          await this.nodePropertyValueRepo.createNodePropertyValue(
            property_key_id,
            value,
          );
        }
      }

      return node;
    } catch (err) {
      console.log(err);
      throw new Error('Failed to create a new Node from object.');
    }
  }

  async createRelationshipFromObject(
    type_name: string,
    obj: Object,
    from_node: string | undefined,
    to_node: string | undefined,
  ): Promise<string | null> {
    if (from_node === undefined || to_node === undefined) {
      return null;
    }
    try {
      const relationship = await this.relationshipRepo.createRelationship(
        from_node,
        to_node,
        type_name,
      );
      if (!relationship) {
        return null;
      }

      for (const [key, value] of Object.entries(obj)) {
        const property_key_id =
          await this.relationshipPropertyKeyRepo.createRelationshipPropertyKey(
            relationship.id,
            key,
          );
        if (property_key_id) {
          await this.relationshipPropertyValueRepo.createRelationshipPropertyValue(
            property_key_id,
            value,
          );
        }
      }

      return relationship.id;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async createRelatedFromNodeToObject(
    id: string,
    node_type_name: string,
    rel_type_name: string,
    obj: {},
  ) {
    const to_node = await this.nodeRepo.readNode(id);
    if (!to_node) {
      return null;
    }

    const from_node = await this.createNodeFromObject(node_type_name, obj);
    const relationship = await this.relationshipRepo.createRelationship(
      from_node.id,
      id,
      rel_type_name,
    );

    return {
      relationship: relationship,
      node: from_node,
    };
  }

  async createRelatedToNodeFromObject(
    id: string,
    node_type_name: string,
    rel_type_name: string,
    obj: {},
  ) {
    const from_node = await this.nodeRepo.readNode(id);
    if (!from_node) {
      return null;
    }

    const to_node = await this.createNodeFromObject(node_type_name, obj);
    const relationship = await this.relationshipRepo.createRelationship(
      id,
      to_node.id,
      rel_type_name,
    );

    return {
      relationship: relationship,
      node: to_node,
    };
  }

  async upsertNodeObject(id: string, obj: Object): Promise<Node | null> {
    try {
      const node = await this.nodeRepo.readNode(id);
      if (!node) {
        return null;
      }

      for (const [key, value] of Object.entries(obj)) {
        const property_key_id =
          await this.nodePropertyKeyRepo.createNodePropertyKey(node.id, key);
        if (property_key_id) {
          await this.nodePropertyValueRepo.createNodePropertyValue(
            property_key_id,
            value,
          );
        }
      }

      return node;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async upsertRelationshipObject(
    rel_id: string,
    obj: Object,
  ): Promise<Relationship | null> {
    try {
      const rel = await this.relationshipRepo.readRelationship(rel_id);
      if (!rel) {
        return null;
      }
      for (const [key, value] of Object.entries(obj)) {
        const property_key_id =
          await this.relationshipPropertyKeyRepo.createRelationshipPropertyKey(
            rel.id,
            key,
          );
        if (property_key_id) {
          await this.relationshipPropertyValueRepo.createRelationshipPropertyValue(
            property_key_id,
            value,
          );
        }
      }

      return rel;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // Layer 3

  // -------- Table --------- //

  async createTable(name: string): Promise<Table> {
    try {
      const table = await this.createNodeFromObject('table', {
        name,
      });

      return tableNodeToTable(table);
    } catch (err) {
      console.log(err);
      throw new Error('Failed to create a new table.');
    }
  }

  async getTable(name: string): Promise<Table | null> {
    try {
      const table: Node | null = await this.nodeRepo.repository.findOne({
        relations: [
          'nodeType',
          'propertyKeys',
          'propertyKeys.propertyValue',
          'nodeRelationships',
          'nodeRelationships.toNode',
          'nodeRelationships.toNode.propertyKeys',
          'nodeRelationships.toNode.propertyKeys.propertyValue',
        ],
        select: {
          nodeRelationships: true,
        },
        where: {
          nodeType: {
            type_name: 'table',
          },
          propertyKeys: {
            property_key: 'name',
            propertyValue: {
              property_value: JSON.stringify({value: name}),
            },
          },
        },
      });
      if (!table) {
        return null;
      }

      return tableNodeToTable(table);
    } catch (err) {
      throw new Error('Failed to get table.');
    }
  }

  async addTableData(
    table_name: string,
    column_name: string,
    row_id: string,
    cell_data: any,
  ): Promise<TableCell> {
    try {
      const table = await this.getTable(table_name);
      const table_cell = await this.createNodeFromObject('table-cell', {
        column: column_name,
        row: row_id,
        data: cell_data,
      });

      await this.createRelationshipFromObject(
        'table-to-table-cell',
        {},
        table?.id,
        table_cell.id,
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const new_cell: TableCell = {};
      table_cell?.propertyKeys?.forEach((key) => {
        (new_cell as any)[key.property_key] = JSON.parse(key.propertyValue.property_value).value;
      });

      return new_cell;
    } catch (err) {
      console.log(err);
      throw new Error('Failed to add table data.');
    }
  }

  // -------- Document --------- //

  async createDocument(name: string): Promise<Document> {
    try {
      const document = await this.createNodeFromObject('document', {
        name,
      });

      return {
        id: document.id,
        name: name,
      };
    } catch (err) {
      console.log(err);
      throw new Error('Failed to create a new document.');
    }
  }

  async getDocument(name: string): Promise<Document | null> {
    try {
      const document = await this.nodeRepo.getNodeByProp('document', {
        key: 'name',
        val: name,
      });

      if (!document) {
        return null;
      }

      return {
        id: document.id,
        name: name,
      };
    } catch (err) {
      console.log(err);
      throw new Error('Failed to get document.');
    }
  }

  // -------- Word --------- //

  async createWord(name: string): Promise<Word | null> {
    try {
      if (await this.getWord(name)) {
        console.log('conflict: ', name)
        return null;
      }
      console.log('no conflict: ', name)
      const word = await this.createNodeFromObject('word', {
        name: {
          value: name,
        },
      });

      return {
        id: word.id,
        name: name,
      };
    } catch (err) {
      console.log(err);
      throw new Error('Failed to create a new word.');
    }
  }

  async getWord(name: string): Promise<Word | null> {
    try {
      const word = await this.nodeRepo.getNodeByProp('word', {
        key: 'name',
        val: {
          value: name,
        },
      });

      if (!word) {
        return null;
      }

      return {
        id: word.id,
        name: name,
      };
    } catch (err) {
      console.log(err);
      throw new Error('Failed to get word.');
    }
  }

  // -------- Word-Sequence --------- //

  async createWordSequence(
    text: string,
    document: string,
    creator: string,
    import_uid: string,
  ): Promise<Node> {
    const word_sequence = await this.createNodeFromObject('word-sequence', {
      'import-uid': import_uid,
    });

    const words = text.split(' ');
    for (const [i, word] of words.entries()) {
      const new_word = await this.createWord(word);
      await this.createRelationshipFromObject(
        'word-sequence-to-word',
        { position: i + 1 },
        word_sequence.id,
        new_word?.id,
      );
    }

    await this.createRelationshipFromObject(
      'word-sequence-to-document',
      {},
      word_sequence.id,
      document,
    );
    await this.createRelationshipFromObject(
      'word-sequence-to-creator',
      {},
      word_sequence.id,
      creator,
    );

    return word_sequence;
  }

  async getText(word_sequence_id: string): Promise<string | null> {
    const word_sequence = await this.nodeRepo.repository.findOne({
      relations: [
        'nodeRelationships',
        'nodeRelationships.toNode',
        'nodeRelationships.toNode.propertyKeys',
        'nodeRelationships.toNode.propertyKeys.propertyValue',
      ],
      where: {
        node_id: word_sequence_id,
      },
    });

    if (!word_sequence || !word_sequence.nodeRelationships) {
      return null;
    }

    let words: Array<string> = [];

    word_sequence.nodeRelationships.forEach((rel) => {
      if (rel.relationship_type === 'word-sequence-to-word') {
        words.push(
          JSON.parse(rel.toNode.propertyKeys.find((key) => key.property_key === 'word')
            ?.propertyValue.property_value).value,
        );
      }
    });

    return words.join(' ');
  }

  // -------- Word-Sequence-Connection --------- //

  async appendWordSequence(from: string, to: string): Promise<string | null> {
    const word_sequence_connection = await this.createRelationshipFromObject(
      'word-sequence-to-word-sequence',
      {},
      from,
      to,
    );

    return word_sequence_connection;
  }

  async getWordSequence(text: string): Promise<string[]> {
    const word_sequences = await this.nodeRepo.listAllNodesByType(
      'word-sequence',
    );
    const filtered_word_sequences = await Promise.all(
      word_sequences.filter(async (word_sequence) => {
        const word_sequence_text = await this.getText(word_sequence.id);
        return word_sequence_text === text;
      }),
    );

    return filtered_word_sequences.map((sequence) => sequence.id);
  }
}

interface Document {
  id?: string;
  name: string;
}
