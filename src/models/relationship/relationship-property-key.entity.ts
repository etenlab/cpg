import { Entity, Column, PrimaryColumn, ManyToOne, Index, RelationId, OneToOne } from "typeorm"
import { nanoid } from "nanoid"
import { Relationship } from "./relationship.entity"
import { RelationshipPropertyValue } from "./relationship-property-value.entity"

@Entity()
export class RelationshipPropertyKey {
    @PrimaryColumn({ length: 21, unique: true, default: () => nanoid() })
    relationship_property_key_uuid!: string

    @Column("null")
    readonly relationship_property_key_id: number | undefined

    @Column("varchar")
    property_key!: string

    @ManyToOne(() => Relationship)
    relationship!: Relationship

    @Index("idx_relationship_property_keys_relationship_uuid")
    @RelationId((relationship: Relationship) => relationship.relationship_uuid)
    relationship_uuid!: string

    @OneToOne(() => RelationshipPropertyValue)
    property_value!: RelationshipPropertyValue
}