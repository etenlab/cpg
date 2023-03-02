import { nanoid } from 'nanoid';
import { Node } from '../../models/node/node.entity';
import { DbService } from '../../services/db.service';
import { SyncService } from '../../services/sync.service';

export class NodeRepository {
  constructor(private dbService: DbService, private syncService: SyncService) {}

  private get repository() {
    return this.dbService.dataSource.getRepository(Node);
  }

  async createNode(type_name: string): Promise<string | undefined> {
    const node = await this.repository.save({
      node_type: type_name,
      sync_layer: this.syncService.syncLayer,
      node_uuid: nanoid(),
    });

    return node.node_uuid;
  }

  async listAllNodesByType(type_name: string): Promise<Node[]> {
    const nodes = await this.repository.findBy({ node_type: type_name });

    return nodes;
  }

  async readNode(node_id: string): Promise<Node | null> {
    const node = await this.repository.findOneBy({ node_uuid: node_id });

    return node;
  }
}
