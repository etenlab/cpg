import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BallotEntries } from "./ballot-enteries.entity";

@Entity()
export class KeyTermDefinition {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id!: string

    @Column('varying character')
    term_id!: string

    @Column('varying character')
    definition!: string

    @OneToMany(() => BallotEntries, (ballotEntries) => ballotEntries.election)
    ballot_entries!: BallotEntries[];
}