import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Syncable } from '../Syncable';
import { Node } from './node.entity';

@Entity()
export class NodePropertyKey extends Syncable {
  @PrimaryColumn({
    length: 21,
    unique: true,
    type: 'varchar',
  })
  id!: string;

  @ManyToOne(() => Node)
  node!: Node;

  @Column('varchar')
  node_id!: string;

  @Column('varchar')
  property_key!: string;
}
