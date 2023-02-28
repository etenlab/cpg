import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column('varchar')
  firstName: string | undefined;

  @Column('varchar')
  lastName: string | undefined;

  @Column('int')
  age: number | undefined;
}
