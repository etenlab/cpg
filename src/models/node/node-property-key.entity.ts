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
  node_property_key_uuid!: string;

  @ManyToOne(() => Node)
  node!: Node;

  node_uuid!: string;

  @Column('varchar')
  property_key!: string;
}
