import initSqlJs, { Database } from "sql.js";
import { DataSource, Repository } from "typeorm";
import {
  Node,
  NodeType,
  NodePropertyKey,
  NodePropertyValue,
  Relationship,
  RelationshipType,
  RelationshipPropertyKey,
  RelationshipPropertyValue,
} from "../models";

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
    const localForageImport = await import("localforage");
    this.localForage = localForageImport.default;
    (window as any).localforage = this.localForage;
  }

  private configureConnection() {
    this.localForage.config({
      description: "user",
      driver: this.localForage.INDEXEDDB,
    });

    return new DataSource({
      type: "sqljs",
      autoSave: true,
      location: "user",
      useLocalForage: true,
      logging: ["error", "query", "schema"],
      synchronize: true,
      entities: [
        Node,
        NodeType,
        NodePropertyKey,
        NodePropertyValue,
        Relationship,
        RelationshipType,
        RelationshipPropertyKey,
        RelationshipPropertyValue,
      ],
    });
  }

  status() {
    console.log("//todo");
  }
}
