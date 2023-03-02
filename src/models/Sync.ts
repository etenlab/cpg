import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SyncSession {
  @PrimaryGeneratedColumn({ type: 'int', name: 'sync_session' })
  id!: number;

  @Column('number')
  syncFrom!: number;

  @Column('number')
  syncTo!: number;

  @Column('datetime')
  createdAt!: Date;

  @Column('boolean')
  completed!: boolean;

  @Column('text')
  error?: string;
}
