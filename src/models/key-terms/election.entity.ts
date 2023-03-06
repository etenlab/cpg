import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BallotEntries } from "./ballot-enteries.entity";

@Entity()
export class Election {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
    id!: string;

    @Column('character varying', { name: 'name', unique: true })
    name!: string;
  
    // @Column('character varying', { name: 'name', unique: true })
    // key_term_id!: Election;
  
    @OneToMany(() => BallotEntries, (ballotEntries) => ballotEntries.election)
    ballot_entries!: BallotEntries[];
  }