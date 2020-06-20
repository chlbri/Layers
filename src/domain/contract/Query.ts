import { DataTypes } from "./Datatypes";
import Entity from "./Entity";
import NFunction from "./NFunction";
import ReturnData from "./ReturnData";

type Query<
  I extends any[] = (DataTypes | Entity)[],
  O = any
> = NFunction<I, Promise<ReturnData<O>>>;

type BulkQuery<
  I extends any[] = (DataTypes | Entity)[],
  O = void
> = NFunction<I, O>;

export { Query, BulkQuery };
