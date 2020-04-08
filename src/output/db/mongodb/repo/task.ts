import { pick } from "lodash";
import "reflect-metadata";
import MongoSource, { ERROR_VALUE } from "../contracts/SourceCollection";
import {
  InsertOneWriteOpResult,
  DeleteWriteOpResultObject,
  UpdateWriteOpResult,
  CollectionInsertOneOptions,
  FindOneOptions,
  UpdateQuery,
  CommonOptions,
  UpdateOneOptions
} from "mongodb";
import IUpdate from "../../../../ebr/contract/IUpdate";
import E_Task from "../../../../ebr/entity/task";
import { IRepo_Task } from "../../../../ia/gateway/db/repo/task";
import { injectable } from "inversify";
import Validator from "../../../../ebr/contract/Validator";
import S_Task from "../../../../ebr/validation/task";
import {ExcludeNull }from "../../../../core/utils";
import { ResultCreate } from "../../../../abr/query/task";

@injectable() /* extends MongoSource<E_Task> */
export default class Task_Mongo implements IRepo_Task {
  get toMap() {
    return {
      label: this.label,
      desc: this.desc,
      createdAt: this.createdAt,
      updates: this.updates,
      deletedAt: this.deletedAt,
      _id: this._id
    };
  }

  get toMapQuery() {
    return ExcludeNull(this.toMap);
  }

  get validate() {
    return this.validator.validate(this);
  }

  copy(label = this.label, desc = this.desc) {
    const out = new Task_Mongo();
    out.compute(label, desc);
    return out;
  }

  // #region CRUD
  async q_create(args?: CollectionInsertOneOptions) {
    const { col, client } = await MongoSource.getCollectionClientWithType<
      E_Task
    >("task");
    if (!col) return ERROR_VALUE;
    const give = this.toMapQuery;
    give.createdAt = new Date();

    const result = col
      .insertOne(give, args)
      .then(arg => {
        const r: ResultCreate = arg.ops[0];
        return r;
      })
      .catch(() => ERROR_VALUE)
      .finally(() => client.close());
    return result;
  }

  async q_read(args?: FindOneOptions) {
    const { col, client } = await MongoSource.getCollectionClientWithType<
      E_Task
    >("task");
    if (!col) return ERROR_VALUE;
    const result = col
      .findOne(this.toMapQuery, args)
      .then(arg => {
        if (!arg) return 1;
        const { desc, label, createdAt } = arg;
        if (!createdAt) return 2;
        return { desc, label, createdAt };
      })
      .catch(() => ERROR_VALUE)
      .finally(() => client.close());
    return result;
  }

  async q_update(arg: UpdateQuery<E_Task>, args?: UpdateOneOptions) {
    const { col, client } = await MongoSource.getCollectionClientWithType<
      E_Task
    >("task");
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
      E_Task
    >("task");
    if (!col) return ERROR_VALUE;
    const result = col
      .deleteOne(this.toMapQuery, args)
      .then(arg => arg.deletedCount === 1)
      .catch(() => ERROR_VALUE)
      .finally(() => client.close());
    return result;
  }
  // #endregion

  public label: string;
  public desc: string;
  public createdAt?: Date;
  public updates?: IUpdate<E_Task> | IUpdate<E_Task>[];
  public deletedAt?: Date;
  public _id?: any;

  compute(label: string, desc: string) {
    this.label = label;
    this.desc = desc;
  }

  constructor() {
    this.label = "";
    this.desc = "";
  }

  validator = new Validator(S_Task);
  col = "task";
}
