import { Entity, Column, PrimaryColumn, Index, RelationId, OneToOne } from "typeorm"
import { nanoid } from "nanoid"
import { NodePropertyKey } from "./node-property-key.entity"

@Entity()
export class NodePropertyValue {
    @PrimaryColumn({ length: 21, unique: true, default: () => nanoid()})
    node_property_value_uuid!: string

    @Column("null")
    readonly node_property_value_id: number | undefined

    @Index("idx_node_property_values_key_uuid")
    @RelationId((node_property_key: NodePropertyKey) => node_property_key.node_property_key_uuid)
    node_property_key_uuid!: string

    @Column("jsonb")
    property_value!: JSON[]
}