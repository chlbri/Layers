import { DataTypes } from "../../contract/Datatypes";
import Entity from "../../contract/Entity";
import { Nullish } from "../../../core/Nullish";

type Query<
  I extends (DataTypes | Entity)[] = (DataTypes | Entity)[],
  O extends DataTypes | Entity = DataTypes | Entity
> = (...arg: I) => O;

type BulkQuery<
  I extends (DataTypes | Entity)[] = (DataTypes | Entity)[],
  O extends any = any
> = (...arg: I) => O;

export default interface CRUD<I extends Entity> {
  create?: Nullish<Query<[Partial<I>]>>;
  read?: Nullish<Query<[Partial<I>]>>;
  update?: Nullish<Query<[Partial<I>, Partial<I>]>>;
  delete?: Nullish<Query<[string]>>;
  bulkCreate?: Nullish<BulkQuery<[Partial<I>]>>;
  queryRead?: Nullish<BulkQuery<[Partial<I>]>>;
  bulkUpdate?: Nullish<BulkQuery<[Partial<I>, Partial<I>]>>;
  bulkDelete?: Nullish<BulkQuery<[string]>>;
  bulk?: any;
}
