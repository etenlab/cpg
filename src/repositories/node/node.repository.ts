import { Repository } from 'typeorm';
import { Node } from '../../models/node/node.entity';
import { DbService } from '../../services/db.service';
import { NodeType } from '../../models';

export class NodeRepository {
  repository!: Repository<Node>;

  constructor(private dbService: DbService) {
    this.repository = this.dbService.dataSource.getRepository(Node);
  }

  async createNode(type_name: string): Promise<Node> {
    let nodeType = await this.dbService.dataSource
      .getRepository(NodeType)
      .findOneBy({ type_name });
    if (!nodeType) {
      nodeType = await this.dbService.dataSource
        .getRepository(NodeType)
        .save({ type_name });
    }

    const new_node = this.repository.create({
      nodeType: nodeType,
    });
    const node = await this.repository.save(new_node);

    return node;
  }

  async listAllNodesByType(type_name: string): Promise<Node[]> {
    const nodes = await this.repository.find({
      relations: ['nodeType', 'property_keys', 'property_keys.property_value'],
      select: {
        property_keys: {
          property_key: true,
          property_value: {
            property_value: true,
          },
        },
      },
      where: {
        nodeType: {
          type_name,
        },
      },
    });
    return nodes;
  }

  async readNode(node_id: string): Promise<Node | null> {
    const node = await this.repository.findOneBy({ id: node_id });

    return node;
  }
}
