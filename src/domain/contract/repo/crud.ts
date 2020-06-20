import { DataTypes } from "../Datatypes";
import Entity from "../Entity";
import { Nullish } from "../../../core/Nullish";
import { Query } from "../Query";
import Piped from "../Piped";

export type NQP<E extends (DataTypes | Entity)[]> = Query<E>;

export default interface CRUD<E extends Entity> extends Piped {
  create: NQP<[Partial<E>]>;
  read: NQP<[Partial<E>]>;
  update: NQP<[Partial<E>, Partial<E>]>;
  delete: NQP<[string]>;
}
