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
  id!: string;

  @Column('varchar')
  property_value!: string;

  @ManyToOne(() => RelationshipPropertyKey)
  relationship_property_key!: RelationshipPropertyKey;

  @Column('varchar')
  relationship_property_key_id!: string;
}
