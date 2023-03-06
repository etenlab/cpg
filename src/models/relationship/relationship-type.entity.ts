import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RelationshipType {
  @PrimaryColumn("varchar")
  type_name!: string;
}
