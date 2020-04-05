import Valid_User1 from "../../../../ia/gateway/validator/user";
// import Source from "../contracts/Source";
import E_User from "../../../../ebr/entity/user";
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
  FindOneAndDeleteOption,
  MongoClientOptions,
  FindOneAndUpdateOption,
  MongoClientCommonOption,
  DbCollectionOptions
} from "mongodb";
import Repo_User from "../../../../ia/gateway/repo/user";
import Validator from "../../../../ia/gateway/contracts/Validator";

// const Strict = new Source<E_User>("user");

const R_User = new Repo_User(Valid_User1);
const validator = R_User.validator;

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
// #endregion

// #region Function Config(done)
function validateConnection<T>(
  args: Partial<T>[],
  conStr: string = MONGODB_URL,
  validator?: Validator<T>,
  conOptions: MongoClientOptions = CON_OPTIONS
) {
  if (validator && !validator.validate(...args)) return undefined;
  return getConnection(conStr, conOptions);
}

async function getConnection(
  conStr: string = MONGODB_URL,
  conOptions: MongoClientOptions = CON_OPTIONS
) {
  const client = new MongoClient(conStr, conOptions);
  const connect = await client
    .connect()
    .then()
    .catch(() => undefined);

  return connect;
}

function getCollection<T>(
  col: string,
  connect: MongoClient,
  dbName = DB_NAME,
  db_options: MongoClientCommonOption = DB_OPTIONS,
  col_options: DbCollectionOptions = COL_OPTIONS
) {
  return connect.db(dbName, db_options).collection<T>(col, col_options);
}

// #endregion

// #region Queries
// #region CRUD
/*  done */ R_User.create = async (arg, args: CollectionInsertOneOptions) => {
  if (!validator.validate(arg)) return false;
  const date1 = new Date();
  // #region Connect
  const connect = await validateConnection([arg]);
  if (!connect) return false;
  // #endregion

  // #region query
  const col = connect
    .db(DB_NAME, DB_OPTIONS)
    .collection<E_User>("user", COL_OPTIONS);
  const result = await col
    .insertOne(arg, args)
    .then()
    .catch(() => undefined);
  connect.close();

  if (!result) {
    return false;
  }
  // #endregion

  // #region Return
  const { firstnames, lastname } = result.ops[0];
  const date2 = new Date();
  const time = date2.valueOf() - date1.valueOf();
  console.log("Average Time for completion : ", time);
  return firstnames && lastname ? { firstnames, lastname } : false;
  // #endregion
};

R_User.read = async (arg, args: FindOneOptions) => {
  const date1 = new Date();

  // #region Connect
  const connect = await validateConnection([arg]);
  if (!connect) return false;

  // #endregion

  // #region query
  // connect.db(DB_NAME).command()
  const col = connect.db(DB_NAME).collection<E_User>("user");
  const result = await col
    .findOne(arg, args)
    .then()
    .catch(() => undefined);
  connect.close();

  if (!result) {
    return false;
  }
  // #endregion

  // #region Return
  const { firstnames, lastname } = result;
  const date2 = new Date();
  const time = date2.valueOf() - date1.valueOf();
  console.log("Average Time for completion : ", time);
  return firstnames && lastname ? { firstnames, lastname } : false;
  // #endregion
};

R_User.update = async (filter, update, args: FindOneAndUpdateOption) => {
  if (!validator.validate(filter, update)) return false;
  const date1 = new Date();
  const connect = await validateConnection([filter, update]);
  if (!connect) return false;

  // #region query
  const col = connect.db(DB_NAME).collection<E_User>("user");
  const result = await col
    .findOneAndUpdate(filter, { $set: update }, args)
    .then()
    .catch(() => undefined);
  connect.close();

  if (!result || !result.value) {
    return false;
  }
  // #endregion

  // #region Return
  const { firstnames, lastname } = result.value;
  const date2 = new Date();
  const time = date2.valueOf() - date1.valueOf();
  console.log("Average Time for completion : ", time);
  return firstnames && lastname ? { firstnames, lastname } : false;
  // #endregion
};

R_User.delete = async (arg, args: FindOneAndDeleteOption) => {
  if (!validator.validate(arg)) return false;
  const date1 = new Date();
  const connect = await validateConnection([arg]);
  if (!connect) return false;

  // #region query
  const col = connect.db(DB_NAME).collection<E_User>("user");
  const result = await col
    .findOneAndDelete(arg, args)
    .then()
    .catch(() => undefined);
  connect.close();

  if (!result || !result.value) {
    return false;
  }
  // #endregion

  // #region Return
  const { _id, firstnames, lastname } = result.value;
  const date2 = new Date();
  const time = date2.valueOf() - date1.valueOf();
  console.log("Average Time for completion : ", time);
  return _id && firstnames && lastname ? { _id, firstnames, lastname } : false;
  // #endregion
};
// #endregion

R_User.login = async (arg, args: FindOneOptions) => {
  const date1 = new Date();
  const connect = await validateConnection([arg]);
  if (!connect) return false;
  // #region query
  const col = connect.db(DB_NAME, {}).collection<E_User>("user", {});
  const result = await col
    .findOne(arg, args)
    .then()
    .catch(() => null);
  connect.close();

  if (!result) {
    return false;
  }
  // #endregion

  // #region Return
  const date2 = new Date();
  const time = date2.valueOf() - date1.valueOf();
  console.log("Average Time for completion : ", time);
  return !!result;
  // #endregion
};
// #endregion

export default R_User;
