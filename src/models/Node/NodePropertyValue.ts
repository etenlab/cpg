import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, Index } from "typeorm"
import { nanoid } from "nanoid"
import { NodePropertyKey } from "./NodePropertyKey"

@Entity()
export class NodePropertyValue {
    @PrimaryColumn({ length: 21, unique: true, default: () => nanoid()})
    node_property_value_uuid: string | undefined

    @Column("null")
    readonly node_property_value_id!: null

    @Index("idx_node_property_values_key_uuid")
    @ManyToOne(type => NodePropertyKey)
    @JoinColumn({ name: "node_property_key_uuid" })
    node_property_key_uuid: string | undefined

    @Column("jsonb")
    property_value: JSON[] | undefined
}