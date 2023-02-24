import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./User";

@Entity('discussion', {schema: 'admin'})
export class Discussion {
    @PrimaryGeneratedColumn({type: 'integer', name: 'id'})
    id!: number;

    @Column('string')
    title!: string;

    @ManyToOne(() => User, (user) => user.discussions)
    user!: User
}
