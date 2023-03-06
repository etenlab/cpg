import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vote {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id!: number;

    @Column('boolean')
    up!: boolean;
  
    @Column('integer', { name: 'ballot_entry_id', unique: true })
    ballot_entry_id!: number;

    @Column('character varying', { name: 'user_id', unique: true })
    user_id!: string
}