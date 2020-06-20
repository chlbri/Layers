import { DataTypes } from "../Datatypes";
import Entity from "../Entity";
import { Query } from "../Query";

export type NQP<
  E1 extends (DataTypes | Entity)[],
  E2 extends (DataTypes | Entity)[] = any
> = Query<E1, E2>;

export default interface ManyToMany<
  E1 extends Entity,
  E2 extends Entity
> {
  create: NQP<[Partial<E1>, Partial<E2>]>;
  delete: NQP<[Partial<E1>, Partial<E2>]>;
  read1: NQP<[Partial<E2>], Partial<E1>[]>;
  read2: NQP<[Partial<E1>], Partial<E2>[]>;
}
