import initSqlJs from 'sql.js';
import { DataSource, Repository } from 'typeorm';
import { NodePropertyKey } from '../models/node/node-property-key.entity';
import { NodePropertyValue } from '../models/node/node-property-value.entity';
import { NodeType } from '../models/node/node-type.entity';
import { Node } from '../models/node/node.entity';
import { RelationshipPropertyKey } from '../models/relationship/relationship-property-key.entity';
import { RelationshipPropertyValue } from '../models/relationship/relationship-property-value.entity';
import { RelationshipType } from '../models/relationship/relationship-type.entity';
import { Relationship } from '../models/relationship/relationship.entity';
import { User } from '../models/User';

export class DbService {
  // todo
  localForage: any;
  dataSource!: DataSource;
  private startupSubscriptions: Function[] = [];

  constructor() {
    // todo
    this.initLocalForage().then(() => {
      initSqlJs({
        locateFile: (file: any) => `https://sql.js.org/dist/${file}`,
      }).then(async (SQL) => {
        (window as any).SQL = SQL;
        this.dataSource = this.configureConnection();
        this.dataSource.initialize();
      });
    });
  }

  onStartup(fn: Function) {
    this.startupSubscriptions.push(fn);
  }

  private async initLocalForage() {
    const localForageImport = await import('localforage');
    this.localForage = localForageImport.default;
    (window as any).localforage = this.localForage;
  }

  private configureConnection() {
    this.localForage.config({
      description: 'user',
      driver: this.localForage.INDEXEDDB,
    });

    return new DataSource({
      type: 'sqljs',
      autoSave: true,
      location: 'user',
      useLocalForage: true,
      logging: ['error', 'query', 'schema'],
      synchronize: true,
      entities: [
        User,
        Node,
        NodeType,
        NodePropertyKey,
        NodePropertyValue,
        Relationship,
        RelationshipPropertyKey,
        RelationshipPropertyValue,
        RelationshipType,
      ],
    });
  }

  status() {
    console.log('//todo');
  }
}

export class UserRepository {
  repository!: Repository<User>;

  constructor(private dbService: DbService) {
    this.repository = this.dbService.dataSource.getRepository(User);
  }

  async save(user: User) {
    return this.repository.save(user);
  }

  async all() {
    return this.repository.find();
  }
}
