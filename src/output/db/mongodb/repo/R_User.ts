import V_User1 from "../../../../ia/gateway/validator/V_User";
// import Source from "../contracts/Source";
import E_User from "../../../../ebr/entity/E_User";
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
  FindOneAndDeleteOption
} from "mongodb";
import AR_User from "../../../../ia/gateway/repo/AR_User";

// const Strict = new Source<E_User>("user");

class User_Repo extends AR_User {}

const R_User = new AR_User(V_User1);

const validator = R_User.validator;
const conStr = "mongodb://localhost:27017";
const DB_NAME = "testca";

R_User.create = async (arg, args: CollectionInsertOneOptions) => {
  if (!validator.validate(arg)) return false;
  const date1 = new Date();
  const client = new MongoClient(conStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 5000
  });
  // #region Get Connection
  const connect = await client
    .connect()
    .then()
    .catch(() => undefined);

  if (!connect) return false;
  // #endregion

  // #region query
  const col = connect.db(DB_NAME).collection<E_User>("user");
  const result = await col
    .insertOne(arg, args)
    .then()
    .catch(() => undefined);
  client.close();

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
  if (!validator.validate(arg)) return false;
  const date1 = new Date();
  const client = new MongoClient(conStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 5000
  });

  // #region Get Connection
  const connect = await client
    .connect()
    .then()
    .catch(() => undefined);

  if (!connect) return false;
  // #endregion

  // #region query
  const col = connect.db(DB_NAME).collection<E_User>("user");
  const result = await col
    .findOne(arg, args)
    .then()
    .catch(() => undefined);
  client.close();

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

R_User.update = async (filter, update, args: FindOneOptions) => {
  if (!validator.validate(filter, update)) return false;
  const date1 = new Date();
  const client = new MongoClient(conStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 5000
  });

  // #region Get Connection
  const connect = await client
    .connect()
    .then()
    .catch(() => undefined);

  if (!connect) return false;
  // #endregion

  // #region query
  const col = connect.db(DB_NAME).collection<E_User>("user");
  const result = await col
    .findOneAndUpdate(filter, { $set: update }, args)
    .then()
    .catch(() => undefined);
  client.close();

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
  const client = new MongoClient(conStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 5000
  });

  // #region Get Connection
  const connect = await client
    .connect()
    .then()
    .catch(() => undefined);

  if (!connect) return false;
  // #endregion

  // #region query
  const col = connect.db(DB_NAME).collection<E_User>("user");
  const result = await col
    .findOneAndDelete(arg, args)
    .then()
    .catch(() => undefined);
  client.close();

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

R_User.login = async (arg, args: MongoCountPreferences) => {
  if (!validator.validate(arg)) return false;
  const client = new MongoClient(conStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 5000
  });
  const date1 = new Date();

  // #region Get Connection
  const connect = await client
    .connect()
    .then()
    .catch(() => undefined);

  if (!connect) return false;
  // #endregion

  // #region query
  const col = connect.db(DB_NAME).collection<E_User>("user");
  const result = await col
    .countDocuments(arg, args)
    .then()
    .catch(() => undefined);
  client.close();

  if (!result ) {
    return false;
  }
  // #endregion

  // #region Return
  const date2 = new Date();
  const time = date2.valueOf() - date1.valueOf();
  console.log("Average Time for completion : ", time);
  return result === 1;
  // #endregion
};

export default R_User;
export { validator };
