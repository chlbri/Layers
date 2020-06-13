// import "reflect-metadata";

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
//   MongoCountPreferences,
//   MongoClientOptions,
//   Db,
//   MongoClientCommonOption,
//   DbCollectionOptions,
//   UpdateQuery,
//   InsertOneWriteOpResult,
//   FindAndModifyWriteOpResultObject,
//   DeleteWriteOpResultObject,
//   UpdateWriteOpResult,
//   WriteOpResult,
//   FindOneAndUpdateOption
// } from "mongodb";

// import Validator from "../../../../ia/gateway/Validator";
// import { injectable } from "inversify";
// import ITimestamps from "../../../../ebr/contract/ITimestamps";
// import _Id from "../../../../ebr/contract/_Id";
// import { pick } from "lodash";
// import { connect } from "mongoose";
// import { DbResponse } from "../../../../abr/contract/db_response";
// // #region MongoDB Config
// const MONGODB_URL = "mongodb://localhost:27017";
// const DB_NAME = "testca";
// const CON_OPTIONS: MongoClientOptions = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   connectTimeoutMS: 5000
// };

// const DB_OPTIONS: MongoClientCommonOption = {};
// const COL_OPTIONS: DbCollectionOptions = {};
// const ERROR_VALUE: false = false;
// // #endregion

// @injectable()
// export default abstract class MongoSource<T extends {}> {
//   // #region Abstract
//   abstract readonly validator?: Validator<T>;
//   abstract readonly col: string;
//   abstract get toInsert(): any;
//   protected abstract get toMap(): T;
//   // #endregion

//   getCollectionClientWithType(
//     dbName = DB_NAME,
//     conStr = MONGODB_URL,
//     conOptions = CON_OPTIONS,
//     db_options = DB_OPTIONS,
//     col_options = COL_OPTIONS
//   ) {
//     return MongoSource.getCollectionClientWithType<T>(
//       this.col,
//       dbName,
//       conStr,
//       conOptions,
//       db_options,
//       col_options
//     );
//   }

//   getCollectionClient(
//     dbName = DB_NAME,
//     conStr = MONGODB_URL,
//     conOptions = CON_OPTIONS,
//     db_options = DB_OPTIONS,
//     col_options = COL_OPTIONS
//   ) {
//     return MongoSource.getCollectionClient(
//       this.col,
//       dbName,
//       conStr,
//       conOptions,
//       db_options,
//       col_options
//     );
//   }

//   // #region Static
//   static async getCollectionClientWithType<T>(
//     colName: string,
//     dbName = DB_NAME,
//     conStr = MONGODB_URL,
//     conOptions = CON_OPTIONS,
//     db_options = DB_OPTIONS,
//     col_options = COL_OPTIONS
//   ) {
//     const client = new MongoClient(conStr, conOptions);
//     const col = await client
//       .connect()
//       .then(cl => cl.db(dbName, db_options).collection<T>(colName, col_options))
//       .catch(() => ERROR_VALUE);

//     return { col, client };
//   }

//   static async getCollectionClient(
//     colName: string,
//     dbName = DB_NAME,
//     conStr = MONGODB_URL,
//     conOptions = CON_OPTIONS,
//     db_options = DB_OPTIONS,
//     col_options = COL_OPTIONS
//   ) {
//     const client = new MongoClient(conStr, conOptions);
//     const col = await client
//       .connect()
//       .then(cl => cl.db(dbName, db_options).collection(colName, col_options))
//       .catch(() => ERROR_VALUE);

//     return { col, client };
//   }
//   // #endregion

//   get toMapQuery() {
//     const toCompute = this.toMap;
//     const tab: (keyof T)[] = [];
//     for (const key in toCompute) {
//       if (toCompute.hasOwnProperty(key) && toCompute[key]) {
//         tab.push(key);
//       }
//     }
//     const out = pick(toCompute, ...tab);
//     console.log("the query to build", out);
//     return out;
//   }

//   get isEmpty() {
//     const input = this.toInsert;
//     for (const key in input) {
//       if (key !== "_id" && input.hasOwnProperty(key)) {
//         if (input[key]) return false;
//       }
//     }
//     return true;
//   }

//   get validate() {
//     if (!this.validator) return true;
//     return this.validator.validate(this.toMapQuery);
//   }

//   // #region CRUD
//   async q_create(args?: CollectionInsertOneOptions) {
//     const { col, client } = await this.getCollectionClientWithType();
//     if (!col) return DbResponse.CONNECTIONFAILED;
//     const inserting = this.toInsert;
    
//     inserting.createdAt = new Date();
//     const result = col
//       .insertOne(inserting, args)
//       .then(() => this.toMap)
//       .catch(() => DbResponse.ERROR)
//       .finally(() => client.close());

//     return result;
//   }

//   async q_read(args?: FindOneOptions) {
//     const { col, client } = await this.getCollectionClientWithType();
//     if (!col) return DbResponse.CONNECTIONFAILED;
//     const result = col
//       .findOne(this.toMapQuery, args)
//       .then(r => (!r ? DbResponse.FAIL : r))
//       .catch(() => DbResponse.ERROR)
//       .finally(() => client.close());

//     return result;
//   }

//   async q_update(update: UpdateQuery<T>, options?: FindOneAndUpdateOption) {
//     const { col, client } = await this.getCollectionClientWithType();
//     if (!col) return DbResponse.CONNECTIONFAILED;
//     const result = col
//       .findOneAndUpdate(this.toMapQuery, update, options)
//       .then(r => (!r.value ? DbResponse.FAIL : r.value))
//       .catch(() => DbResponse.ERROR)
//       .finally(() => client.close());

//     return await result;
//   }

//   async q_delete(options?: UpdateOneOptions) {
//     const { col, client } = await this.getCollectionClient();
//     if (!col) return DbResponse.CONNECTIONFAILED;
//     const deletedAt = new Date();
//     const result = col
//       .updateOne(this.toMapQuery, { $set: {deletedAt} }, options)
//       .then(r =>
//         r.modifiedCount === 1
//           ? DbResponse.COMPLETED
//           : r.matchedCount === 1
//           ? DbResponse.MATCHED
//           : DbResponse.FAIL
//       )
//       .catch(() => DbResponse.ERROR)
//       .finally(() => client.close());

//     return await result;
//   }

//   async q_fdelete(
//     options?: CommonOptions & {
//       bypassDocumentValidation?: boolean;
//     }
//   ) {
//     const { col, client } = await this.getCollectionClientWithType();
//     if (!col) return DbResponse.CONNECTIONFAILED;
//     const result = col
//       .deleteOne(this.toMapQuery, options)
//       .then(r =>
//         r.result.ok === 1
//           ? DbResponse.COMPLETED
//           : r.result.n === 1
//           ? DbResponse.MATCHED
//           : DbResponse.FAIL
//       )
//       .catch(() => DbResponse.ERROR)
//       .finally(() => client.close());

//     return await result;
//   }
//   // #endregion
// }

// export {
//   DbResponse,
//   MONGODB_URL,
//   DB_NAME,
//   CON_OPTIONS,
//   DB_OPTIONS,
//   COL_OPTIONS,
//   ERROR_VALUE
// };
