import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { RelationshipPropertyKey } from './relationship-property-key.entity';
import { Syncable } from '../Syncable';

@Entity()
export class RelationshipPropertyValue extends Syncable {
  @PrimaryColumn({
    length: 21,
    unique: true,
    type: 'varchar',
  })
  relationship_property_value_uuid!: string;

  @Column('varchar')
  property_value!: JSON[];

  @ManyToOne(() => RelationshipPropertyKey)
  relationship_property_key!: RelationshipPropertyKey;

  relationship_property_key_uuid!: string;
}
