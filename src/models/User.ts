import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {Discussion} from "./Discussions";
import {Message} from "./Message";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    readonly id!: number

    @Column("varchar")
    firstName: string | undefined

    @Column("varchar")
    lastName: string | undefined

    @Column("int")
    age: number | undefined

    @OneToMany(() => Discussion, (discussion) => discussion.user)
    discussions!: Discussion[]

    @OneToMany(() => Message, (messages => messages.user))
    messages!: Message[]
}
