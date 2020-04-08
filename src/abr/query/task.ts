import _Id from "../../ebr/contract/_Id";
import { ResultOne, Query } from "../contract/types/queries";
import E_Task from "../../ebr/entity/task";
import { ALL, CREATE, READ, UPDATE, DELETE } from "../../ebr/helpers/task";

type R<T extends ALL> = ResultOne<E_Task, T>;

type ResultCreate = R<CREATE>;
type ResultRead = R<READ>;
type ResultUpdate = R<UPDATE>;
type ResultDelete = R<DELETE>;

export default interface Queries {
  q_create: Query<ResultCreate>;
  q_read: Query<ResultRead>;
  q_update: Query<ResultUpdate>;
  q_delete: Query<ResultDelete>;
}

export { ResultCreate, ResultRead, ResultUpdate, ResultDelete };
