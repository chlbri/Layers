// import E_User from "../../../ebr/entity/E_User";
// import Entity from "../../../ebr/contract/Entity";
// import _Id from "../../../ebr/contract/_Id";

import E_User from "../../../ebr/entity/user";

type QuerySchema<T, K extends keyof T> = Extract<K, keyof T>;

type ResultOne<T, K extends keyof T, O = never> = Promise<
  Required<Pick<T, K>> | O
>;

type ResultMany<T, K extends keyof T, O = never> = Promise<
  Required<Pick<T, K>>[] | O
>;

type Query<O, F extends (...args: any) => any = (...args: any) => any> = (
  func: F,
  ...others: Parameters<F>
) => O;

type FF = Query<string, (erg: number) => any>;

// type CreateOne<
//   T,
//   K extends keyof T = keyof T,
//   F extends (...args: any) => any = (...args: any) => any
// > = ((func: (...args: any) => any) => any) extends (
//   func: (...args: infer U) => any
// ) => any
//   ? (
//       arg: T,
//       func: (...args: U) => any,
//       ...others: U
//     ) => ResultOne<T, K, number | boolean>
//   : never;

// type Create<T, K extends keyof T = keyof T> = Query<
//   ResultOne<T, K, number | boolean>,
//   [...(T | T[] | Partial<T> | Partial<T>[])[]]
// >;

type CreateOne<T, K extends keyof T = keyof T> = (
  arg: T,
  ...others: any[]
) => ResultOne<T, K, number | boolean>;

type CreateMany<T, K extends keyof T = keyof T> = (
  args: T[],
  ...others: []
) => ResultMany<T, K, number | boolean>;

type ReadOne<T, K extends keyof T = keyof T> = (
  arg: Partial<T>,
  ...others: any[]
) => ResultOne<T, K, false>;

type ReadMany<T, K extends keyof T = keyof T> = (
  args: Partial<T>[],
  count: number,
  ...others: any[]
) => ResultMany<T, K, number | boolean>;

type UpdateOne<T, K extends keyof T = keyof T> = (
  filter: Partial<T>,
  update: Partial<T>,
  ...others: any[]
) => ResultOne<T, K, number | boolean>;

type UpdateMany<T, K extends keyof T = keyof T> = (
  filter: Partial<T>,
  update: Partial<T>,
  count: number,
  ...others: any[]
) => ResultMany<T, K, number | boolean>;

type DeleteOne<T, K extends keyof T = keyof T> = (
  arg: Partial<T>,
  ...others: any[]
) => ResultOne<T, K, number | boolean>;

type DeleteMany<T, K extends keyof T = keyof T> = ResultMany<
  T,
  K,
  number | boolean
>;

type Test = DeleteMany<E_User, "_id">;

type BulkMany<T, K extends keyof T = keyof T> = (
  args: Partial<T>[],
  ...others: any[]
) => ResultMany<T, K, number | boolean>;

type BulkOne<T, K extends keyof T = keyof T> = (
  args: Partial<T>,
  ...others: any[]
) => ResultOne<T, K, number | boolean> ;

type EntityQuery<T, K extends keyof T = keyof T> =
  | CreateOne<T, K>
  | CreateMany<T, K>
  | ReadOne<T, K>
  | ReadMany<T, K>
  | UpdateOne<T, K>
  | UpdateMany<T, K>
  | DeleteOne<T, K>
  | DeleteMany<T, K>
  | BulkMany<T, K>;

type Custom<I, O> = (arg: Required<I>, ...others: []) => O;

export {
  QuerySchema,
  CreateOne,
  CreateMany,
  ReadOne,
  ReadMany,
  UpdateOne,
  UpdateMany,
  DeleteOne,
  DeleteMany,
  BulkOne,
  BulkMany,
  Custom,
  Query,
  EntityQuery,
  ResultOne,
  ResultMany
};
