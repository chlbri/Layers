import { DataTypes } from "./Data";
import Entity from "./Entity";
import IFuntcion from "./IFunction";

type Query<
  I extends (DataTypes | Entity)[] = (DataTypes | Entity)[],
  O extends DataTypes | Entity = DataTypes | Entity
> = IFuntcion<I, O>;

type BulkQuery<
  I extends (DataTypes | Entity)[] = (DataTypes | Entity)[],
  O extends any = any
> = IFuntcion<I, O>;

export { Query, BulkQuery };
