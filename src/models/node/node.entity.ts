import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Syncable } from '../Syncable';

@Entity()
export class Node extends Syncable {
  @PrimaryColumn({
    length: 21,
    unique: true,
    type: 'varchar',
  })
  id!: string;

  @Column('varchar')
  node_type!: string;
}
