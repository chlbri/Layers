import { DataTypes } from "../../domain/contract/Data";
import Entity from "../../domain/contract/Entity";
import { Nullish } from "../../core/Nullish";
import { Query } from "../../domain/contract/Query";

export type NQP<E extends (DataTypes | Entity)[]> = Query<E>;

export default interface CRUD<E extends Entity> {
  create: NQP<[Partial<E>]>;
  read: NQP<[Partial<E>]>;
  update: NQP<[Partial<E>, Partial<E>]>;
  delete: NQP<[string]>;
}
