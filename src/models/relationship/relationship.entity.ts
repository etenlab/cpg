import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, Index, RelationId } from "typeorm"
import { nanoid } from "nanoid"
import { Node } from "../node/node.entity"
import { RelationshipType } from "./relationship-type.entity"

@Entity()
export class Relationship {
    @PrimaryColumn({ length: 21, unique: true, default: () => nanoid()})
    relationship_uuid!: string

    @Column("null")
    readonly relationship_id: number | undefined

    @ManyToOne(() => RelationshipType)
    @RelationId((relationship_type: RelationshipType) => relationship_type.type_name)
    relationship_type!: string

    @ManyToOne(() => Node)
    from_node!: Node

    @Index("idx_relationships_from_node_uuid")
    @RelationId((node: Node) => node.node_uuid)
    from_node_uuid!: string

    @ManyToOne(() => Node)
    to_node!: Node

    @Index("idx_relationships_to_node_uuid")
    @RelationId((node: Node) => node.node_uuid)
    to_node_uuid!: string
}