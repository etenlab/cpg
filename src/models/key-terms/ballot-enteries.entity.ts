import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Election } from "./election.entity";
import { Vote } from "./vote.entityt";

@Entity()
export class BallotEntries {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column('character varying', { name: 'name', unique: true })
  name!: string;

  @ManyToOne(() => Election, (elections) => elections.ballot_entries)
  @JoinColumn([{ name: 'election_id', referencedColumnName: 'id' }])
  election!: Election;

  @OneToMany(() => Vote, (votes) => votes.ballot_entry_id)
  votes!: Vote[];
}