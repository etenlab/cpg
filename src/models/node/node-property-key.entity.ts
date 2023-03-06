import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  Index,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { Node } from './node.entity';
import { NodePropertyValue } from './node-property-value.entity';

@Entity()
export class NodePropertyKey {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21 })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('text', { nullable: true })
  readonly node_property_key_id!: string | null;

  @Column('varchar')
  property_key!: string;

  @ManyToOne(() => Node, (node) => node.property_keys, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'node_uuid', referencedColumnName: 'node_uuid' })
  node!: Node;

  // @Index("idx_node_property_keys_node_uuid_key")
  // @RelationId((node: Node) => node.node_uuid)
  // node_uuid!: string

  @OneToOne(
    () => NodePropertyValue,
    (nodePropertyValue) => nodePropertyValue.property_key,
  )
  property_value!: NodePropertyValue;
}
