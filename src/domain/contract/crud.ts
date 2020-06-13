import { DataTypes } from "./utils";
import Entity from "./Entity";

type Query<
  I extends (DataTypes | Entity)[] = (DataTypes | Entity)[],
  O extends DataTypes = DataTypes
> = (...arg: I) => O;

export default interface CRUD<I extends Entity> {
  create: Query<[Partial<I>], DataTypes>;
  read: Query<[Partial<I>], DataTypes>;
  update: Query<[Partial<I>, Partial<I>], DataTypes>;
  delete: Query<[string], DataTypes>;
}
