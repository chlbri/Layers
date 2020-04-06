// import E_User from "../../../ebr/entity/E_User";
// import Entity from "../../../ebr/contract/Entity";
// import _Id from "../../../ebr/contract/_Id";

type Query<O = any, I extends any[] = any[]> = (...args: I) => O;

type ResultOne<T, K extends keyof T, O = never> = Promise<
  Required<Pick<T, K>> | O
>;

type ResultMany<T, K extends keyof T, O = never> = Promise<
  Required<Pick<T, K>>[] | O
>;

// type Query<O, F extends (...args: any) => any = (...args: any) => any> = (
//   func: F,
//   ...others: Parameters<F>
// ) => O;

type TT<T> = ((...args: any[]) => any) extends (
  arg: any,
  ...args: any[]
) => Promise<Required<Pick<T, keyof T>>[] | boolean>
  ? true
  : false;

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

type DeleteMany<T, K extends keyof T = keyof T> = (
  arg: Partial<T>,
  ...others: any[]
) => ResultMany<T, K, number | boolean>;

type BulkMany<T, K extends keyof T = keyof T> = (
  args: Partial<T>[],
  ...others: any[]
) => ResultMany<T, K, number | boolean>;

type BulkOne<T, K extends keyof T = keyof T> = (
  args: Partial<T>,
  ...others: any[]
) => ResultOne<T, K, number | boolean>;

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

type Custom<I, O> = (arg: Required<I>, ...others: any[]) => O;

export {
  Query,
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
  EntityQuery,
  ResultOne,
  ResultMany
};
