import { Repository } from "typeorm";
import { Node } from "../../models";
import { NodePropertyKey } from "../../models/node/node-property-key.entity";
import { DbService } from "../../services/db.service";

export class NodePropertyKeyRepository {
  repository!: Repository<NodePropertyKey>;

  constructor(private dbService: DbService) {
    this.repository = this.dbService.dataSource.getRepository(NodePropertyKey);
  }

  async createNodePropertyKey(
    node_id: string,
    key_name: string
  ): Promise<string | null> {
    const property_key = await this.repository
      .createQueryBuilder("nodePropertyKey")
      .where("nodePropertyKey.node_uuid = :node_id", { node_id })
      .andWhere("nodePropertyKey.property_key = :key_name", { key_name })
      .getOne();

    if (property_key) {
      return property_key.id;
    }

    const node = await this.dbService.dataSource
      .getRepository(Node)
      .findOneBy({ id: node_id });

    if (!node) {
      return null;
    }

    const new_property_key_instance = this.repository.create({
      property_key: key_name,
    });

    new_property_key_instance.node = node;

    const new_property_key = await this.repository.save(
      new_property_key_instance
    );

    return new_property_key.id;
  }
}
