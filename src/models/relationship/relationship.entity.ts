import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  Index,
  OneToMany,
  JoinColumn,
  BeforeInsert,
} from "typeorm";
import { nanoid } from "nanoid";
import { Node } from "../node/node.entity";
import { RelationshipType } from "./relationship-type.entity";
import { RelationshipPropertyKey } from "./relationship-property-key.entity";

@Entity()
export class Relationship {
  @PrimaryColumn("uuid", { type: "varchar", length: 21 })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column("text", { nullable: true })
  readonly relationship_id!: string | null;

  @ManyToOne(() => RelationshipType, { onDelete: "CASCADE" })
  @JoinColumn({ name: "relationship_type", referencedColumnName: "type_name" })
  relationshipType!: RelationshipType;

  @ManyToOne(() => Node, { onDelete: "CASCADE" })
  @JoinColumn({ name: "from_node_uuid", referencedColumnName: "node_uuid" })
  fromNode!: Node;

  // @Index("idx_relationships_from_node_uuid")

  @ManyToOne(() => Node, { onDelete: "CASCADE" })
  @JoinColumn({ name: "to_node_uuid", referencedColumnName: "node_uuid" })
  toNode!: Node;

  // @Index("idx_relationships_to_node_uuid")

  @OneToMany(
    () => RelationshipPropertyKey,
    (relationship_property_key) => relationship_property_key.relationship
  )
  property_keys!: RelationshipPropertyKey[];
}
