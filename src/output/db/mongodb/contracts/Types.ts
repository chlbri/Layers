import { Cursor } from "mongodb";

type Await<T> = T extends Promise<infer U> ? U : T;

type Yield<T> = T extends {
  addCursorFlag(flag: string, value: boolean): Cursor<infer U>;
  batchSize(value: number): Cursor<infer U>;
  clone(): Cursor<infer U>;
  comment(value: string): Cursor<infer U>;
  filter(filter: object): Cursor<infer U>;
  hint(hint: string | object): Cursor<infer U>;
  limit(value: number): Cursor<infer U>;
  max(max: object): Cursor<infer U>;
  maxAwaitTimeMS(value: number): Cursor<infer U>;
  maxScan(maxScan: object): Cursor<infer U>;
  maxTimeMS(value: number): Cursor<infer U>;
  min(min: object): Cursor<infer U>;
  project(value: object): Cursor<infer U>;
  returnKey(returnKey: object): Cursor<infer U>;
  setCursorOption(field: string, value: object): Cursor<infer U>;
  showRecordId(showRecordId: object): Cursor<infer U>;
  skip(value: number): Cursor<infer U>;
  snapshot(snapshot: object): Cursor<infer U>;
  sort(
    keyOrList: string | object[] | object,
    direction?: number
  ): Cursor<infer U>;
  stream(options?: { transform?: (document: infer U) => any }): Cursor<infer U>;
}
  ? U
  : T;

type PromiseFunction<T> = (...args: any[]) => Promise<T>;

type CursorFunction<T> = (...args: any[]) => Cursor<T>;

type Projection<T, K extends keyof T = keyof T> = {
  [P in K | "_id"]-?: boolean;
};


export { Await, Yield, CursorFunction, PromiseFunction, Projection };
