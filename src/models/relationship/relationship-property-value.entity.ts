import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, Index } from "typeorm"
import { nanoid } from "nanoid"
import { RelationshipPropertyKey } from "./relationship-property-key.entity"

@Entity()
export class RelationshipPropertyValue {
    @PrimaryColumn({ length: 21, unique: true, default: () => nanoid()})
    relationship_property_value_uuid: string | undefined

    @Column("null")
    readonly relationship_property_value_id!: null

    @Index("idx_relationship_property_values_key_uuid")
    @ManyToOne(type => RelationshipPropertyKey)
    @JoinColumn({ name: "relationship_property_value_uuid" })
    relationship_property_key_uuid: string | undefined

    @Column("jsonb")
    property_value: JSON[] | undefined
}