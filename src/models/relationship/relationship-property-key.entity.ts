import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  Index,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from "typeorm";
import { nanoid } from "nanoid";
import { Relationship } from "./relationship.entity";
import { RelationshipPropertyValue } from "./relationship-property-value.entity";

@Entity()
export class RelationshipPropertyKey {
  @PrimaryColumn("uuid", { type: "varchar", length: 21 })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column("text", { nullable: true })
  readonly relationship_property_key_id!: string | null;

  @Column("varchar")
  property_key!: string;

  @ManyToOne(() => Relationship, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "relationship_uuid",
    referencedColumnName: "relationship_uuid",
  })
  relationship!: Relationship;

  // @Index("idx_relationship_property_keys_relationship_uuid")

  @OneToOne(
    () => RelationshipPropertyValue,
    (relationshipPropertyValue) => relationshipPropertyValue.property_key
  )
  property_value!: RelationshipPropertyValue;
}
