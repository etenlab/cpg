import { Entity, Column, PrimaryColumn, ManyToOne, RelationId, OneToMany } from "typeorm"
import { nanoid } from "nanoid"
import { NodeType } from "./node-type.entity"
import { NodePropertyKey } from "./node-property-key.entity"
import { Relationship } from "../relationship/relationship.entity"

@Entity()
export class Node {
    @PrimaryColumn({ length: 21, unique: true, default: () => nanoid()})
    node_uuid!: string

    @Column("null")
    readonly node_id: number | undefined

    @ManyToOne(() => NodeType)
    @RelationId((node_type: NodeType) => node_type.type_name)
    node_type!: string

    @OneToMany(() => NodePropertyKey, (node_property_key) => node_property_key.node)
    property_keys!: NodePropertyKey[]

    @OneToMany(() => Relationship, (relationship) => relationship.from_node)
    node_relationships: Relationship[] | undefined
}