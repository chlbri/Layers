import "reflect-metadata";
import MongoSource, { ERROR_VALUE } from "../contracts/SourceCollection";
import {
  InsertOneWriteOpResult,
  WithId,
  DeleteWriteOpResultObject,
  UpdateWriteOpResult
} from "mongodb";
import IUpdate from "../../../../ebr/contract/IUpdate";
import { injectable } from "inversify";
import E_Task from "../../../../ebr/entity/task";
import Valid_Task1 from "../../../../abr/validator/task";
import { IRepo_Task } from "../../../../ia/gateway/db/repo/task";

@injectable()
export default class Task_Mongo extends MongoSource<E_Task>
  implements IRepo_Task {
  get toMapWithId() {
    return {
      label: this.label,
      desc: this.desc,
      createdAt: this.createdAt,
      updates: this.updates,
      deletedAt: this.deletedAt,
      _id: this._id
    };
  }

  get toMap() {
    return {
      label: this.label,
      desc: this.desc,
      createdAt: this.createdAt,
      updates: this.updates,
      deletedAt: this.deletedAt
    };
  }

  copy(
    label = this.label,
    desc = this.desc,
    updates = this.updates,
    deletedAt = this.deletedAt,
    _id = this._id
  ) {
    const out = new Task_Mongo();
    out.compute(label, desc, updates, deletedAt, _id);
    return out;
  }
  r_create(arg: InsertOneWriteOpResult<WithId<E_Task>>) {
    const { desc, label, _id } = arg.ops[0];
    return { desc, label, _id };
  }

  r_read(arg: E_Task | null) {
    if (!arg) return 1;
    const { desc, label, createdAt } = arg;
    return { desc, label, createdAt };
  }
  r_update(arg: UpdateWriteOpResult) {
    return arg.modifiedCount === 1;
  }
  r_delete(arg: DeleteWriteOpResultObject) {
    return arg.deletedCount === 1;
  }

  public label = "";
  public desc = "";
  public createdAt: Date;
  public updates?: IUpdate<E_Task> | IUpdate<E_Task>[];
  public deletedAt?: Date;
  public _id?: any;
  
  compute(
    label: string,
    desc: string,
    updates?: IUpdate<E_Task> | IUpdate<E_Task>[],
    deletedAt?: Date,
    _id?: any
  ) {
    this.label = label;
    this.desc = desc;
    this.updates = updates;
    this.deletedAt = deletedAt;
    this._id = _id;
  }

  constructor() {
    super();
    this.createdAt = new Date();
  }

  validator = Valid_Task1;
  col = "task";
}
