import {
  Collection,
  CollectionBulkWriteOptions,
  CollectionInsertManyOptions,
  CollectionInsertOneOptions,
  CommonOptions,
  FilterQuery,
  FindOneOptions,
  MongoClient,
  ObjectId,
  UpdateManyOptions,
  UpdateOneOptions,
  EndCallback,
  MongoCountPreferences,
  MongoClientOptions,
  Db,
  MongoClientCommonOption,
  DbCollectionOptions,
  UpdateQuery,
  InsertOneWriteOpResult,
  FindAndModifyWriteOpResultObject,
  DeleteWriteOpResultObject,
  UpdateWriteOpResult,
  WithId,
  OptionalId,
  WriteOpResult
} from "mongodb";

import Validator from "../../../../ebr/contract/Validator";
import T from "../../../../ebr/entity/user";
import { Projection } from "./Types";
import { ResultOne } from "../../../../abr/contract/types/queries2";
import { PropTypes } from "../../../../ebr/contract/types/utils";

// #region MongoDB Config
const MONGODB_URL = "mongodb://localhost:27017";
const DB_NAME = "testca";
const CON_OPTIONS: MongoClientOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 5000
};
const DB_OPTIONS: MongoClientCommonOption = {};
const COL_OPTIONS: DbCollectionOptions = {};
const ERROR_VALUE: false = false;
// #endregion

export default abstract class MongoSource<T extends {}> {
  static readonly MONGODB_URL = MONGODB_URL;
  static readonly DB_NAME = DB_NAME;
  static readonly CON_OPTIONS = CON_OPTIONS;
  static readonly DB_OPTIONS = DB_OPTIONS;
  static readonly COL_OPTIONS = COL_OPTIONS;
  static readonly ERROR_VALUE = ERROR_VALUE;

  public abstract readonly validator?: Validator<T>;
  public abstract readonly col: string;
  static async getConnection(
    conStr = MongoSource.MONGODB_URL,
    conOptions = MongoSource.CON_OPTIONS
  ) {
    const client = new MongoClient(conStr, conOptions);
    const connect = await client
      .connect()
      .then()
      .catch(() => MongoSource.ERROR_VALUE);

    return connect;
  }

  async getCollectionClient(
    dbName = DB_NAME,
    conStr = MONGODB_URL,
    conOptions = CON_OPTIONS,
    db_options = DB_OPTIONS,
    col_options = COL_OPTIONS
  ) {
    return MongoSource.getCollectionClient<T>(
      this.col,
      dbName,
      conStr,
      conOptions,
      db_options,
      col_options
    );
  }

  static async getCollectionClient<T>(
    colName: string,
    dbName = DB_NAME,
    conStr = MONGODB_URL,
    conOptions = CON_OPTIONS,
    db_options = DB_OPTIONS,
    col_options = COL_OPTIONS
  ) {
    const client = new MongoClient(conStr, conOptions);
    const col = await client
      .connect()
      .then(cl => cl.db(dbName, db_options).collection<T>(colName, col_options))
      .catch(() => undefined);

    return { col, client };
  }

  getCollection(
    connect: MongoClient,
    dbName = MongoSource.DB_NAME,
    db_options = MongoSource.DB_OPTIONS,
    col_options = MongoSource.COL_OPTIONS
  ) {
    return connect.db(dbName, db_options).collection<T>(this.col, col_options);
  }

  abstract get toMap(): T;
  abstract get toMapWithId(): OptionalId<T>;

  isEmpty() {
    const input = this.toMap;
    for (const key in input) {
      if (key !== "_id" && input.hasOwnProperty(key)) {
        if (input[key]) return true;
      }
    }
    return false;
  }

  get validate() {
    if (!this.validator) return true;
    return this.validator.validate(this.toMap);
  }

  abstract r_create(value: InsertOneWriteOpResult<WithId<T>>): any;
  abstract r_read(arg: T | null): any;
  abstract r_update(arg: UpdateWriteOpResult): any;
  abstract r_delete(arg: DeleteWriteOpResultObject): any;

  // #region CRUD
  async q_create(args?: CollectionInsertOneOptions) {
    const { col, client } = await this.getCollectionClient();
    if (!col) return ERROR_VALUE;
    const result = col
      .insertOne(this.toMapWithId, args)
      .then(this.r_create)
      .catch(() => ERROR_VALUE)
      .finally(() => client.close());

    return result;
  }

  async q_read(args?: FindOneOptions) {
    const { col, client } = await this.getCollectionClient();
    if (!col) return ERROR_VALUE;
    const result = col
      .findOne(this.toMap, args)
      .then(this.r_read)
      .catch(() => ERROR_VALUE)
      .finally(() => client.close());

    return await result;
  }

  async q_update(update: UpdateQuery<T>, options?: UpdateOneOptions) {
    const { col, client } = await this.getCollectionClient();
    if (!col) return ERROR_VALUE;
    const result = col
      .updateOne(this.toMap, update, options)
      .then(this.r_update)
      .catch(() => ERROR_VALUE)
      .finally(() => client.close());

    return await result;
  }

  async q_delete(
    options?: CommonOptions & {
      bypassDocumentValidation?: boolean | undefined;
    }
  ) {
    const { col, client } = await this.getCollectionClient();
    if (!col) return ERROR_VALUE;
    const result = col
      .deleteOne(this.toMap, options)
      .then(this.r_delete)
      .catch(() => MongoSource.ERROR_VALUE)
      .finally(() => client.close());

    return await result;
  }
  // #endregion
}

export {
  MONGODB_URL,
  DB_NAME,
  CON_OPTIONS,
  DB_OPTIONS,
  COL_OPTIONS,
  ERROR_VALUE
};
