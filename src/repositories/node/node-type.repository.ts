import { Repository } from "typeorm";
import { NodeType } from "../../models/node/node-type.entity";
import { DbService } from "../../services/db.service";

export class NodeTypeRepository {
  repository!: Repository<NodeType>;

  constructor(private dbService: DbService) {
    this.repository = this.dbService.dataSource.getRepository(NodeType);
  }

  async createNodeType(type_name: string): Promise<string> {
    const node_type = await this.repository.save({
      type_name,
    });

    return node_type.type_name;
  }

  async listNodeTypes(): Promise<NodeType[]> {
    const node_types = await this.repository.find({ select: ["type_name"] });

    return node_types;
  }
}
