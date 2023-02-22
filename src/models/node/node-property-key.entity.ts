import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, Index } from "typeorm"
import { nanoid } from "nanoid"
import { Node } from "./node.entity"

@Entity()
export class NodePropertyKey {
    @PrimaryColumn({ length: 21, unique: true, default: () => nanoid()})
    node_property_key_uuid: string | undefined

    @Column("null")
    readonly node_property_key_id!: null

    @Index("idx_node_property_keys_node_uuid_key")
    @ManyToOne(type => Node)
    @JoinColumn({ name: "node_uuid" })
    node_uuid: string | undefined

    @Column("varchar")
    property_key: string | undefined
}