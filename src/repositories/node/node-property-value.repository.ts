import { Repository } from "typeorm";
import { NodePropertyKey } from "../../models";
import { NodePropertyValue } from "../../models/node/node-property-value.entity";
import { DbService } from "../../services/db.service";

export class NodePropertyValueRepository {
  repository!: Repository<NodePropertyValue>;

  constructor(private dbService: DbService) {
    this.repository =
      this.dbService.dataSource.getRepository(NodePropertyValue);
  }

  async createNodePropertyValue(
    key_id: string,
    key_value: any
  ): Promise<string | null> {
    const node_property_key = await this.dbService.dataSource
      .getRepository(NodePropertyKey)
      .findOneBy({ node_property_key_uuid: key_id });

    if (!node_property_key) {
      return null;
    }

    const new_property_value_instance = this.repository.create({
      property_value: key_value,
    });

    new_property_value_instance.property_key = node_property_key;

    const node_property_value = await this.repository.save(
      new_property_value_instance
    );

    return node_property_value.node_property_value_uuid;
  }
}
