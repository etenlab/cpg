import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
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
  relationship_uuid!: string;

  @ManyToOne(() => RelationshipType)
  relationship_type!: string;

  @ManyToOne(() => Node)
  from_node!: Node;

  from_node_uuid!: string;

  @ManyToOne(() => Node)
  to_node!: Node;

  to_node_uuid!: string;
}
