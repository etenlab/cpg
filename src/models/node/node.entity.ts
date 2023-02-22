import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm"
import { nanoid } from "nanoid"
import { NodeType } from "./node-type.entity"

@Entity()
export class Node {
    @PrimaryColumn({ length: 21, unique: true, default: () => nanoid()})
    node_uuid: string | undefined

    @Column("null")
    readonly node_id!: null

    @ManyToOne(type => NodeType)
    @JoinColumn({ name: "type_name" })
    node_type: string | undefined
}