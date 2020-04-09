import MongoSource, { ERROR_VALUE, DbResponse } from "../contracts/MongoSource";
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
import E_Task from "../../../../ebr/entity/task";

@injectable()
export default class User_Mongo extends MongoSource<E_User>
  implements IRepo_User {
  col = "user";

  get toInsert() {
    return this.toMap;
  }

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
    const r = await super.q_create(args);
    if (typeof r === "number") return r;
    const { firstnames, lastname } = r;
    return { firstnames, lastname };
  }

  async q_read(args?: FindOneOptions) {
    const r = await super.q_read(args);
    if (typeof r === "number") return r;
    const { firstnames, lastname, login, mdp, _id } = r;
    return { firstnames, lastname, login, mdp, _id };
  }

  async q_update(arg: UpdateQuery<E_User>, args?: UpdateOneOptions) {
    const r = await super.q_update(arg, args);
    if (typeof r === "number") return r;
    const { firstnames, lastname, login, mdp } = r;
    return { firstnames, lastname, login, mdp };
  }

  async q_delete(args?: CommonOptions) {
    const r = await super.q_delete(args);
    return r;
  }
  // #endregion

  static async search_deleted() {
    // #region Connect to Collection
    const { col, client } = await MongoSource.getCollectionClientWithType<
      E_User
    >("user");
    if (!col) return DbResponse.CONNECTIONFAILED;
    // #endregion
    // #region query

    const result = await col
      .find({ deletedAt: { $ne: null } })
      .project({
        firstnames: true,
        lastname: true,
        _id: false,
        deletedAt: true,
      })
      .toArray()
      .then(r => {
        return r;
      })
      .catch(r => {
        console.log(r);
        return DbResponse.ERROR;
      })
      .finally(() => client.close());

    return result;
    // #endregion
  }
  async q_login() {
    // #region Connect to Collection
    if (!this.validate) return DbResponse.FAIL;
    const { col, client } = await this.getCollectionClientWithType();
    if (!col) return DbResponse.CONNECTIONFAILED;
    // #endregion
    // #region query
    console.log("MapQuery ..... :\n", this.toMapQuery);

    const result = await col
      .findOne(this.toMapQuery, {
        projection: { lastname: true, firstnames: true, _id: false }
      })
      .then(r => {
        console.log(r);

        return !!r ? DbResponse.COMPLETED : DbResponse.FAIL;
      })
      .catch(() => DbResponse.ERROR)
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
    super();
    this.firstnames = "";
    this.lastname = "";
    this.login = "";
    this.mdp = "";
  }
}
