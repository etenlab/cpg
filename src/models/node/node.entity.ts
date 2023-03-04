import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryColumn,
  BeforeInsert,
} from "typeorm";
import { nanoid } from "nanoid";
import { NodeType } from "./node-type.entity";
import { NodePropertyKey } from "./node-property-key.entity";
import { Relationship } from "../relationship/relationship.entity";

@Entity()
export class Node {
  @PrimaryColumn("uuid", { type: "varchar", length: 21 })
  node_uuid!: string;

  @BeforeInsert()
  setId() {
    this.node_uuid = nanoid();
  }

  @Column("text", { nullable: true })
  readonly node_id!: string | null;

  @ManyToOne(() => NodeType, { onDelete: "CASCADE" })
  @JoinColumn({ name: "node_type", referencedColumnName: "type_name" })
  nodeType!: NodeType;

  @OneToMany(
    () => NodePropertyKey,
    (node_property_key) => node_property_key.node
  )
  property_keys!: NodePropertyKey[];

  @OneToMany(() => Relationship, (relationship) => relationship.fromNode)
  node_relationships: Relationship[] | undefined;
}
