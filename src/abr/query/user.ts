import E_User from "../../ebr/entity/user";

import { NAME, ALL, DELETE, CREDENTIALS } from "../../ebr/helpers/user";

import _Id from "../../ebr/contract/_Id";
import { ResultOne, Query } from "../contract/queries";

type R<T extends ALL> = ResultOne<E_User, T>;

type ResultCreate = R<NAME>;
type ResultRead = R<NAME>;
type ResultUpdate = R<NAME>;
type ResultDelete = R<NAME>;
type ResultLogin = R<CREDENTIALS>;

export default interface Queries {
  q_create: Query<ResultCreate>;
  q_read: Query<ResultRead>;
  q_update: Query<ResultUpdate>;
  q_delete: Query<ResultDelete>;
  q_login: Query<ResultLogin>;
}

export { ResultCreate, ResultRead, ResultUpdate, ResultDelete, ResultLogin };
