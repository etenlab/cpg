import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Entity()
export class Discussion {
    @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'id' })
    id!: number;

    @Column('varchar', { nullable: true })
    table_name!: string

    @Column('int', { nullable: true })
    row!: number

    @OneToMany(() => Post, (post) => post.discussion)
    posts!: Post[]
}
