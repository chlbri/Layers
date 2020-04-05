// import {
//   Collection,
//   CollectionBulkWriteOptions,
//   CollectionInsertManyOptions,
//   CollectionInsertOneOptions,
//   CommonOptions,
//   FilterQuery,
//   FindOneOptions,
//   MongoClient,
//   ObjectId,
//   UpdateManyOptions,
//   UpdateOneOptions,
//   EndCallback,
//   MongoCountPreferences
// } from "mongodb";

// import { PromiseFunction, Await, CursorFunction } from "./Types";
// import CRUD from "../../../../abr/contract/crud/CRUD";

// const conStr = "localhost.21017"
// const DB_NAME = "testca"

// const client = new MongoClient("localhost.21017");
// const db = client.db("DB_NAME");

// export default class<T> {
//   readonly collection: Collection<T>;

//   protected catch: EndCallback = err => console.log(err);

//   public readonly forceClose = client.close(true);

//   constructor(readonly name: string) {
//     // var t = T.name;
//     this.collection = db.collection<T>(name);
//   }

//   // #region Golden Globe Functions
//   private async MongoPromise<F extends PromiseFunction<any>>(
//     func: F,
//     ...args: Parameters<F>
//   ) {
//     let result: Await<ReturnType<F>>;
//     client.connect((err, client) => {

//     })
//     client.connect().then(async () => {
//       await func(...args)
//         .then(r => (result = r))
//         .catch(this.catch)
//         .finally(client.close);
//     });
//     return result;
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
//     let result: T[];
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
