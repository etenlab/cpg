import { Repository } from 'typeorm';
import { NodePropertyKey } from '../../models/node/node-property-key.entity';
import { DbService } from '../../services/db.service';

export class NodePropertyKeyRepository {
  repository!: Repository<NodePropertyKey>;

  constructor(private dbService: DbService) {
    this.repository = this.dbService.dataSource.getRepository(NodePropertyKey);
  }

  async createNodePropertyKey(
    node_id: string,
    key_name: string,
  ): Promise<string | undefined> {
    const node_property_key = await this.repository.save({
      node_uuid: node_id,
      property_key: key_name,
    });

    return node_property_key.node_property_key_uuid;
  }
}
