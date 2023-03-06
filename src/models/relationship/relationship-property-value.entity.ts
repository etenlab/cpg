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
import { RelationshipPropertyKey } from './relationship-property-key.entity';

@Entity()
export class RelationshipPropertyValue {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21 })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('text', { nullable: true })
  readonly relationship_property_value_id!: string | null;

  @Column('varchar')
  property_value!: any;

  @OneToOne(() => RelationshipPropertyKey)
  @JoinColumn({
    name: 'relationship_property_key_uuid',
    referencedColumnName: 'relationship_property_key_uuid',
  })
  property_key!: RelationshipPropertyKey;

  // @Index("idx_relationship_property_values_key_uuid")
}
