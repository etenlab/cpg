import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { NodePropertyKey } from './node-property-key.entity';
import { Syncable } from '../Syncable';

@Entity()
export class NodePropertyValue extends Syncable {
  @PrimaryColumn({
    length: 21,
    unique: true,
    type: 'varchar',
  })
  node_property_value_uuid!: string;

  @ManyToOne(() => NodePropertyKey)
  node_property_key!: NodePropertyKey;

  node_property_key_uuid!: string;

  @Column('varchar')
  property_value!: JSON[];
}
