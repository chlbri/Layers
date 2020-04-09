import _Id from "../../ebr/contract/_Id";
import { ResultOne, Query } from "../contract/queries";
import E_Task from "../../ebr/entity/task";
import { ALL, CREATE, READ, UPDATE, DELETE } from "../../ebr/helpers/task";

type R<T extends ALL> = ResultOne<E_Task, T>;

type TaskCreated = R<CREATE>;
type TaskRead = R<READ>;
type TaskUpdated = R<UPDATE>;
type TaskDeleted = R<DELETE>;

export default interface Queries {
  q_create: Query<R<CREATE>>;
  q_read: Query<R<READ>>;
  q_update: Query<R<READ>>;
  q_delete: Query<R<READ>>;
}

export { TaskCreated, TaskRead, TaskUpdated, TaskDeleted };
