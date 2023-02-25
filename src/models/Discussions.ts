import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./User";

@Entity()
export class Discussion {
    @PrimaryGeneratedColumn('increment', {type: 'integer', name: 'id'})
    id!: number;

    @Column('varchar')
    title!: string;


    @Column('text')
    text!: string;

    @ManyToOne(() => User, (user) => user.discussions)
    user!: User
}
