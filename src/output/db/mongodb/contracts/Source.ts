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
  MongoClientCommonOption
} from "mongodb";

import Validator from "../../../../ia/gateway/contracts/Validator";
import E_User from "../../../../ebr/entity/user";

// #region MongoDB Config
const MONGODB_URL = "mongodb://localhost:27017";
const DB_NAME = "testca";
const CON_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 5000
};
// #endregion

function getCollectionForMutation<T>(
  args: Partial<T>[],
  col: string,
  conStr: string = MONGODB_URL,
  db = DB_NAME,
  validator?: Validator<T>,
  conOptions: MongoClientOptions = CON_OPTIONS
) {
  if (validator && !validator.validate(...args)) return undefined;
  return getCollection(col, db, conStr, conOptions);
}

async function getCollection<T>(
  col: string,
  db = DB_NAME,
  conStr = MONGODB_URL,
  conOptions: MongoClientOptions = CON_OPTIONS
) {
  const client = new MongoClient(conStr, conOptions);
  const connect = await client
    .connect()
    .then()
    .catch(() => undefined);

  return connect ? connect.db(db).collection<T>(col) : connect;
}

async function bulkCollection<T>(
  col: Collection<T>,
  queries: any[],
  args?: CollectionBulkWriteOptions
) {
  const result = await col
    .bulkWrite(queries, args)
    .then()
    .catch(() => undefined);
  return result;
}

type Projection<T, K extends keyof T = keyof T> = {
  [P in K | "_id"]-?: boolean;
};

type WantedReturn<T, K extends keyof T = keyof T> = Promise<
  Projection<T, K> | Projection<T, K>[] | T | T[] | boolean
>;

type T = Projection<E_User, "login">;


async function queryCol<T, K extends keyof T = keyof T>(
  col: Collection<T>,
  arg?: Partial<T>,
  options?: FindOneOptions,
  projection?: Projection<T, K>
) /* : WantedReturn<T, K> */ {
  const result = arg
    ? projection
      ? await col
          .find(arg, options)
          .project(projection)
          .toArray()
          .catch(() => undefined)
      : await col
          .find(arg, options)
          .toArray()
          .catch(() => undefined)
    : projection
    ? await col
        .find(arg)
        .project(projection)
        .toArray()
        .catch(() => undefined)
    : await col
        .find(arg)
        .toArray()
        .catch(() => undefined);
  return result;
}


// export default class<T> {
//   readonly collection: Collection<T>;

//   protected catch: EndCallback = err => console.log(err);

//   public readonly forceClose = client.close(true);

//   constructor(public readonly col: string) {
//     // var t = T.name;
//     this.collection = db.collection<T>(col);
//   }

//   // #region Golden Globe Functions
//   private async MongoPromise<F extends PromiseFunction<any>>(
//     func: F,
//     ...args: Parameters<F>
//   ) {
//     const connect = await getConnection();
//     if (!connect) return;
//     const col = getCollection(this.col, connect);
//     let result: Await<ReturnType<F>>;
//     let re = await col
//     .func(...args)
//     .then()
//     .catch(() => undefined);
//   client.close();
//     client.connect().then(async () => {
//       await func(...args)
//         .then(r => (result = r))
//         .catch(this.catch)
//         .finally(client.close);
//     });
//     return result ? result : {};
//   }

//   private async connectMutation<F extends PromiseFunction<any>>(
//     func: F,
//     args: Parameters<F>,
//     result: Await<ReturnType<F>>
//   ) {
//     await client.connect().then(async () => {
//       await func(...args)
//         .then(r => (result = r))
//         .catch(this.catch)
//         .finally(client.close);
//     });
//     return result;
//   }

//   private MongoCursor<F extends CursorFunction<T>>(
//     func: F,
//     ...args: Parameters<F>
//   ) {
//     let result: T[] = [];
//     result = this.connectQuery<F>(func, args, result);
//     return result;
//   }

//   private connectQuery<F extends CursorFunction<T>>(
//     func: F,
//     args: Parameters<F>,
//     result: T[]
//   ) {
//     client.connect().then(() => {
//       // func(...args)
//       //   .next()
//       //   .then(r => result.push(r))
//       //   .catch(this.catch);
//       func(...args)
//         .toArray()
//         .then(val => (result = val))
//         .catch(this.catch);
//       client.close();
//     });
//     return result;
//   }
//   // #endregion

//   // #region Create
//   protected _insertOne(docs: any, options?: CollectionInsertManyOptions) {
//     return this.collection.insertOne(docs, options);
//   }

//   public readonly createOne = (
//     doc: any,
//     options?: CollectionInsertOneOptions
//   ) => this.MongoPromise(this._insertOne, doc, options);

//   protected _insertMany(doc: [], options?: CollectionInsertManyOptions) {
//     return this.collection.insertMany(doc, options);
//   }
//   public readonly createMany = (
//     doc: [],
//     options?: CollectionInsertManyOptions
//   ) => this.MongoPromise(this._insertMany, doc, options);

//   // #endregion

//   // #region Read
//   protected _findOne(filter: FilterQuery<T>, options?: FindOneOptions) {
//     return this.collection.findOne(filter, options);
//   }

//   public readonly readOne = (
//     filter: FilterQuery<T>,
//     options?: FindOneOptions
//   ) => this.MongoPromise(this._findOne, filter, options);

//   protected _findMany(filter: FilterQuery<T>, options?: FindOneOptions) {
//     return this.collection.find(filter, options);
//   }

//   public readonly readMany = (
//     filter: FilterQuery<T>,
//     options?: FindOneOptions
//   ) => this.MongoCursor(this._findMany, filter, options);
//   // #endregion

//   protected _exists(filter: FilterQuery<T>, options?: MongoCountPreferences) {
//     return this.collection.countDocuments(filter, { limit: 1 });
//   }

//   public exists(filter: FilterQuery<T>, options?: MongoCountPreferences) {
//     return this.MongoPromise(this._exists, filter, options);
//   }

//   // #region Update
//   protected _updateOne(
//     filter: FilterQuery<T>,
//     update: Partial<T>,
//     options?: UpdateOneOptions
//   ) {
//     return this.collection.updateOne(filter, update, options);
//   }

//   public readonly updateOne = (
//     filter: FilterQuery<T>,
//     update: Partial<T>,
//     options?: UpdateOneOptions
//   ) => this.MongoPromise(this._updateOne, filter, update, options);
//   //  {
//   //   client.connect((err, result) => {
//   //     this._updateOne(filter, update, options);
//   //     client.close();
//   //   });
//   // };

//   protected _updateMany(
//     filter: FilterQuery<T>,
//     update: Partial<T>,
//     options?: UpdateManyOptions
//   ) {
//     return this.collection.updateMany(filter, update, options);
//   }

//   public readonly updateMany = (
//     filter: FilterQuery<T>,
//     update: Partial<T>,
//     options?: UpdateManyOptions
//   ) => {
//     client.connect((err, result) => {
//       this._updateOne(filter, update, options);
//       client.close();
//     });
//   };
//   // #endregion

//   // #region Delete
//   protected _deleteOne(filter: FilterQuery<T>, options?: CommonOptions) {
//     return this.collection.deleteOne(filter, options);
//   }

//   public readonly deleteOne = (
//     filter: FilterQuery<T>,
//     options?: CommonOptions
//   ) => this.MongoPromise(this._deleteMany, filter, options);

//   protected _deleteMany(filter: FilterQuery<T>, options?: CommonOptions) {
//     return this.collection.deleteMany(filter, options);
//   }

//   public readonly deleteMany = (
//     filter: FilterQuery<T>,
//     options?: CommonOptions
//   ) => this.MongoPromise(this._deleteMany, filter, options);
//   //endregion

//   // #region Bulkwrite
//   protected _bulkwrite(
//     operations: [object],
//     options?: CollectionBulkWriteOptions
//   ) {
//     return this.collection.bulkWrite(operations, options);
//   }

//   public readonly bulkwrite = (
//     operations: [object],
//     options?: CollectionBulkWriteOptions
//   ) => this.MongoPromise(this._bulkwrite, operations, options);
//   // #endregion
// }
