import { Entity, PrimaryColumn, ManyToOne, Column } from 'typeorm';
import { Node } from '../node/node.entity';
import { RelationshipType } from './relationship-type.entity';
import { Syncable } from '../Syncable';

@Entity()
export class Relationship extends Syncable {
  @PrimaryColumn({
    length: 21,
    unique: true,
    type: 'varchar',
  })
  id!: string;

  @ManyToOne(() => RelationshipType)
  @Column('varchar')
  relationship_type!: string;

  @ManyToOne(() => Node)
  from_node!: Node;

  @Column('varchar')
  from_node_id!: string;

  @ManyToOne(() => Node)
  to_node!: Node;

  @Column('varchar')
  to_node_id!: string;
}
