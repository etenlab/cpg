import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { NodePropertyKey } from './node-property-key.entity';

@Entity()
export class NodePropertyValue {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21 })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('text', { nullable: true })
  readonly node_property_value_id!: string | null;

  @Column('varchar')
  property_value!: any;

  @OneToOne(
    () => NodePropertyKey,
    (nodePropertyKey) => nodePropertyKey.property_value,
  )
  @JoinColumn({
    name: 'node_property_key_uuid',
    referencedColumnName: 'node_property_key_uuid',
  })
  property_key!: NodePropertyKey;

  // @Index("idx_node_property_values_key_uuid")
  // @RelationId((node_property_key: NodePropertyKey) => node_property_key.node_property_key_uuid)
  // node_property_key_uuid!: string
}
