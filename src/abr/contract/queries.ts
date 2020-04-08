// import E_User from "../../../ebr/entity/E_User";
// import Entity from "../../../ebr/contract/Entity";
// import _Id from "../../../ebr/contract/_Id";

import { DbResponse } from "./db_response";

type OTHERS = boolean | number;

type ResultOne<T, K extends keyof T = keyof T, O = OTHERS> =
  | Pick<T, K>
  | O;

type ResultMany<T, K extends keyof T = keyof T, O = OTHERS> =
  | Pick<T, K>[]
  | O;

type Query<O = any, I extends any[] = any[]> = (...args: I) => Promise<O>;

export { ResultOne, ResultMany, Query };
