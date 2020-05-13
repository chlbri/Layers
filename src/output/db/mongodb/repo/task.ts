import { pick } from "lodash";
import "reflect-metadata";
import MongoSource, { ERROR_VALUE } from "../contracts/MongoSource";
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
import { IRepo_Task } from "../../../../ia/gateway/repo/task";
import { injectable } from "inversify";
import Validator from "../../../../ia/gateway/Validator";
import S_Task from "../../../../ia/gateway/validation/task";
import { ExcludeNull } from "../../../../core/utils";
import {
  TaskCreated,
  TaskRead,
  TaskUpdated,
  TaskDeleted
} from "../../../../abr/query/task";

@injectable() /* extends MongoSource<E_Task> */
export default class Task_Mongo extends MongoSource<E_Task>
  implements IRepo_Task {
  get toInsert() {
    return this.toMap;
  }

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
    const r = await super.q_create(args);
    if (typeof r === "number") return r;
    const { label, desc } = r;
    // console.log("Testing .... : ", r);
    return { label, desc };
  }

  async q_read(args?: FindOneOptions) {
    const r: TaskRead = await super.q_read(args);
    return r;
  }

  async q_update(arg: UpdateQuery<E_Task>, args?: UpdateOneOptions) {
    const r: TaskUpdated = await super.q_update(arg, args);
    return r;
  }

  async q_delete(args?: CommonOptions) {
    const r: TaskDeleted = await super.q_delete(args);
    return r;
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
    super();
    this.label = "";
    this.desc = "";
  }

  validator = new Validator(S_Task);
  col = "task";
}
