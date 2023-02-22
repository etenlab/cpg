import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, Index } from "typeorm"
import { nanoid } from "nanoid"
import { Node } from "../Node/Node"
import { RelationshipType } from "./RelationshipType"

@Entity()
export class Relationship {
    @PrimaryColumn({ length: 21, unique: true, default: () => nanoid()})
    relationship_uuid: string | undefined

    @Column("null")
    readonly relationship_id!: null

    @ManyToOne(type => RelationshipType)
    @JoinColumn({ name: "type_name" })
    relationship_type: string | undefined

    @Index("idx_relationships_from_node_uuid")
    @ManyToOne(type => Node)
    @JoinColumn({ name: "node_uuid" })
    from_node_uuid: string | undefined

    @Index("idx_relationships_to_node_uuid")
    @ManyToOne(type => Node)
    @JoinColumn({ name: "node_uuid" })
    to_node_uuid: string | undefined
}