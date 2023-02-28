import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Index,
  RelationId,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { RelationshipPropertyKey } from './relationship-property-key.entity';

@Entity()
export class RelationshipPropertyValue {
  @PrimaryColumn({ length: 21, unique: true, default: () => nanoid() })
  relationship_property_value_uuid!: string;

  @Column('null')
  readonly relationship_property_value_id: number | undefined;

  @Column('jsonb')
  property_value!: JSON[];

  @ManyToOne(() => RelationshipPropertyKey)
  relationship_property_key!: RelationshipPropertyKey;

  @Index('idx_relationship_property_values_key_uuid')
  @RelationId(
    (relationship_property_key: RelationshipPropertyKey) =>
      relationship_property_key.relationship_property_key_uuid,
  )
  relationship_property_key_uuid!: string;
}
