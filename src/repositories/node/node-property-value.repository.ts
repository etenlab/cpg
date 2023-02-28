import { Repository } from 'typeorm';
import { NodePropertyValue } from '../../models/node/node-property-value.entity';
import { DbService } from '../../services/db.service';

export class NodePropertyValueRepository {
  repository!: Repository<NodePropertyValue>;

  constructor(private dbService: DbService) {
    this.repository =
      this.dbService.dataSource.getRepository(NodePropertyValue);
  }

  async createNodePropertyValue(
    key_id: string,
    key_value: any,
  ): Promise<string | undefined> {
    const node_property_value = await this.repository.save({
      node_property_key_uuid: key_id,
      property_value: key_value,
    });

    return node_property_value.node_property_value_uuid;
  }
}
