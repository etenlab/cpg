import { Entity, Column, PrimaryColumn, ManyToOne, RelationId } from 'typeorm';
import { nanoid } from 'nanoid';
import { NodeType } from './node-type.entity';

@Entity()
export class Node {
  @PrimaryColumn({ length: 21, unique: true, default: () => nanoid() })
  node_uuid!: string;

  @Column('null')
  readonly node_id: number | undefined;

  @ManyToOne(() => NodeType)
  @RelationId((node_type: NodeType) => node_type.type_name)
  node_type!: string;
}
