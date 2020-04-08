import MongoSource, { ERROR_VALUE } from "../contracts/SourceCollection";
import "reflect-metadata"
import E_User from "../../../../ebr/entity/user";
import { IRepo_User } from "../../../../ia/gateway/db/repo/user";
import {
  InsertOneWriteOpResult,
  WithId,
  DeleteWriteOpResultObject,
  UpdateWriteOpResult,
  FindOneOptions
} from "mongodb";
import IUpdate from "../../../../ebr/contract/IUpdate";
import Valid_User1 from "../../../../abr/validator/user";
import { injectable } from "inversify";

@injectable()
export default class User_Mongo extends MongoSource<E_User> implements IRepo_User {
  get toMapWithId() {
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

  get toMap() {
    return {
      firstnames: this.firstnames,
      lastname: this.lastname,
      login: this.login,
      mdp: this.mdp,
      createdAt: this.createdAt,
      updates: this.updates,
      deletedAt: this.deletedAt
    };
  }

  copy(
    firstnames = this.firstnames,
    lastname = this.lastname,
    login = this.login,
    mdp = this.mdp,
    createdAt = this.createdAt,
    updates = this.updates,
    deletedAt = this.deletedAt,
    _id = this._id
  ) {
    return new User_Mongo(
      firstnames,
      lastname,
      login,
      mdp,
      createdAt,
      updates,
      deletedAt,
      _id
    );
  }

  r_create(arg: InsertOneWriteOpResult<WithId<E_User>>) {
    const { firstnames, lastname } = arg.ops[0];
    return { firstnames, lastname };
  }
  r_read(arg: E_User | null) {
    if (!arg) return 1;
    const { firstnames, lastname } = arg;
    return { firstnames, lastname };
  }
  r_update(arg: UpdateWriteOpResult) {
    return arg.modifiedCount === 1;
  }
  r_delete(arg: DeleteWriteOpResultObject) {
    return arg.deletedCount === 1;
  }

  constructor(
    public firstnames: string | string[],
    public lastname: string,
    public login: string,
    public mdp: string,
    public createdAt?: Date,
    public updates?: IUpdate<E_User> | IUpdate<E_User>[],
    public deletedAt?: Date,
    public _id?: any
  ) {
    super();
  }

  validator = Valid_User1;
  col = "user";
 async q_login(args?: FindOneOptions) {
    // #region Connect to Collection
    if (!this.validate) return ERROR_VALUE;
    const { col, client } = await this.getCollectionClient();
    if (!col) return ERROR_VALUE;
    // #endregion
    // #region query
    const result = await col
      .findOne(this.toMap, args)
      .then(r => !!r)
      .catch(() => ERROR_VALUE)
      .finally(() => client.close());

    return result;
    // #endregion
  }
}
