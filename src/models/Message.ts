import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Discussion} from "./Discussions";

@Entity()
export class Message {
    @PrimaryGeneratedColumn({type: 'integer', name: 'id'})
    id!: number;

    @Column('text')
    title!: string

    @Column('integer')
    userId!: number;

    @ManyToOne(() => User, (user) => user.messages)
    user!: User

    @ManyToMany(() => Discussion)
    @JoinTable()
    discussion!: Discussion[]

}
