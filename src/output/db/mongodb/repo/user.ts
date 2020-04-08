import MongoSource, { ERROR_VALUE } from "../contracts/SourceCollection";
import "reflect-metadata";
import E_User from "../../../../ebr/entity/user";
import { IRepo_User } from "../../../../ia/gateway/db/repo/user";
import {
  InsertOneWriteOpResult,
  DeleteWriteOpResultObject,
  UpdateWriteOpResult,
  FindOneOptions,
  CollectionInsertOneOptions,
  UpdateOneOptions,
  UpdateQuery,
  CommonOptions
} from "mongodb";
import IUpdate from "../../../../ebr/contract/IUpdate";
import { injectable } from "inversify";
import Validator from "../../../../ebr/contract/Validator";
import S_User from "../../../../ebr/validation/user";
import { ExcludeNull } from "../../../../core/utils";

@injectable()
export default class User_Mongo implements IRepo_User {
  validator = new Validator(S_User);

  get toMap() {
    return {
      firstnames: this.firstnames,
      lastname: this.lastname,
      login: this.login,
      mdp: this.mdp,
      createdAt: this.createdAt,
      updates: this.updates,
      deletedAt: this.deletedAt,
      _id: this._id
    };
  }

  get validate() {
    return this.validator.validate(this);
  }

  get toMapQuery() {
    return ExcludeNull(this.toMap);
  }

  copy(
    firstnames = this.firstnames,
    lastname = this.lastname,
    login = this.login,
    mdp = this.mdp
  ) {
    const out = new User_Mongo();
    out.compute(firstnames, lastname, login, mdp);
    return out;
  }

  // #region Queries
  // #region CRUD
  async q_create(args?: CollectionInsertOneOptions) {
    const { col, client } = await MongoSource.getCollectionClientWithType<
      E_User
    >("user");
    if (!col) return ERROR_VALUE;
    const give = this.toMapQuery;
    give.createdAt = new Date();
    const result = col
      .insertOne(give, args)
      .then(arg => {
        const { firstnames, lastname } = arg.ops[0];
        return { firstnames, lastname };
      })
      .catch(() => ERROR_VALUE)
      .finally(() => client.close());
    return result;
  }

  async q_read(args?: FindOneOptions) {
    const { col, client } = await MongoSource.getCollectionClientWithType<
      E_User
    >("user");
    if (!col) return ERROR_VALUE;
    const result = col
      .findOne(this.toMapQuery, args)
      .then(arg => {
        if (!arg) return 1;
        const { firstnames, lastname } = arg;
        return { firstnames, lastname };
      })
      .catch(() => ERROR_VALUE)
      .finally(() => client.close());
    return result;
  }

  async q_update(arg: UpdateQuery<E_User>, args?: UpdateOneOptions) {
    const { col, client } = await MongoSource.getCollectionClientWithType<
      E_User
    >("user");
    if (!col) return ERROR_VALUE;
    console.log(this.toMapQuery);
    console.log(this);

    const result = col
      .updateOne(this.toMapQuery, arg, args)
      .then(arg => {
        return arg.modifiedCount === 1 ? 1 : arg.matchedCount === 1 ? 2 : 0;
      })
      .catch(() => ERROR_VALUE)
      .finally(() => client.close());
    return result;
  }

  async q_delete(args?: CommonOptions) {
    const { col, client } = await MongoSource.getCollectionClientWithType<
      E_User
    >("user");
    if (!col) return ERROR_VALUE;
    const result = col
      .deleteOne(this.toMapQuery, args)
      .then(arg => arg.deletedCount === 1)
      .catch(() => ERROR_VALUE)
      .finally(() => client.close());
    return result;
  }
  // #endregion

  async q_login(args?: FindOneOptions) {
    // #region Connect to Collection
    if (!this.validate) return ERROR_VALUE;
    const { col, client } = await MongoSource.getCollectionClientWithType<
      E_User
    >("user");
    if (!col) return ERROR_VALUE;
    // #endregion
    // #region query
    const result = await col
      .findOne(this.toMapQuery, args)
      .then(r => !!r)
      .catch(() => ERROR_VALUE)
      .finally(() => client.close());

    return result;
    // #endregion
  }
  // #endregion

  firstnames?: string | string[];
  lastname?: string;
  login?: string;
  mdp?: string;
  createdAt?: Date;
  updates?: IUpdate<E_User> | IUpdate<E_User>[];
  deletedAt?: Date;
  _id?: any;

  compute(
    firstnames?: string | string[],
    lastname?: string,
    login?: string,
    mdp?: string
  ) {
    this.firstnames = firstnames;
    this.lastname = lastname;
    this.login = login;
    this.mdp = mdp;
  }

  constructor() {
    this.firstnames = "";
    this.lastname = "";
    this.login = "";
    this.mdp = "";
  }
}
