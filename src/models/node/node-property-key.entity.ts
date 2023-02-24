import { Entity, Column, PrimaryColumn, ManyToOne, Index, RelationId, OneToOne, JoinColumn } from "typeorm"
import { nanoid } from "nanoid"
import { Node } from "./node.entity"
import { NodePropertyValue } from "./node-property-value.entity"

@Entity()
export class NodePropertyKey {
    @PrimaryColumn({ length: 21, unique: true, default: () => nanoid()})
    node_property_key_uuid!: string

    @Column("null")
    readonly node_property_key_id: number | undefined

    @Column("varchar")
    property_key!: string

    @ManyToOne(() => Node)
    node!: Node

    @Index("idx_node_property_keys_node_uuid_key")
    @RelationId((node: Node) => node.node_uuid)
    node_uuid!: string

    @OneToOne(() => NodePropertyValue)
    @JoinColumn()
    property_value!: NodePropertyValue
}