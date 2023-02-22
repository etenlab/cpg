import { Entity, PrimaryColumn } from "typeorm"

@Entity()
export class NodeType {
    @PrimaryColumn("varchar")
    type_name!: string
}