import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Relationship } from './relationship.entity';
import { Syncable } from '../Syncable';

@Entity()
export class RelationshipPropertyKey extends Syncable {
  @PrimaryColumn({
    length: 21,
    unique: true,
    type: 'varchar',
  })
  id!: string;

  @Column('varchar')
  property_key!: string;

  @ManyToOne(() => Relationship)
  relationship!: Relationship;

  @Column('varchar')
  relationship_id!: string;
}
