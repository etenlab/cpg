import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, Index } from "typeorm"
import { nanoid } from "nanoid"
import { Relationship } from "./Relationship"

@Entity()
export class RelationshipPropertyKey {
    @PrimaryColumn({ length: 21, unique: true, default: () => nanoid()})
    relationship_property_key_uuid: string | undefined

    @Column("null")
    readonly relationship_property_key_id!: null

    @Index("idx_relationship_property_keys_relationship_uuid")
    @ManyToOne(type => Relationship)
    @JoinColumn({ name: "relationship_uuid" })
    relationship_uuid!: string

    @Column("varchar")
    property_key: string | undefined
}