import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { KeyTermDefinition } from "./key-term-definition.entity";

@Entity()
export class KeyTerm {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id!: string

    @Column('varying character')
    term!: string

    @OneToMany(() => KeyTermDefinition, (keyDefinition => keyDefinition.term_id))
    definitions!: KeyTermDefinition[]
}