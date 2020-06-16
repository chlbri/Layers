import { DataTypes } from "./Data";
import Entity from "./Entity";
import NFunction from "./NFunction";
import ReturnData from "./ReturnData";

type Query<
  I extends (DataTypes | Entity)[] = (DataTypes | Entity)[],
  O extends DataTypes | Entity = DataTypes | Entity
> = NFunction<I, Promise<ReturnData<O>>>;

type BulkQuery<
  I extends (DataTypes | Entity)[] = (DataTypes | Entity)[],
  O extends any = any
> = NFunction<I, O>;

export { Query, BulkQuery };
