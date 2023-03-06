// import { Repository } from 'typeorm';
import { NodeType } from '../../models/node/node-type.entity';
import { DbService } from '../../services/db.service';
import { SyncService } from '../../services/sync.service';

export class NodeTypeRepository {
  constructor(private dbService: DbService, private syncService: SyncService) {}

  private get repository() {
    return this.dbService.dataSource.getRepository(NodeType);
  }

  async createNodeType(type_name: string): Promise<string> {
    const node_type = await this.repository.save({
      type_name,
      sync_layer: this.syncService.syncLayer,
    });

    return node_type.type_name;
  }

  async listNodeTypes(): Promise<NodeType[]> {
    const node_types = await this.repository.find({ select: ['type_name'] });

    return node_types;
  }
}
