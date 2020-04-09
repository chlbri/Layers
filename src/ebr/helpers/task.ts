import { Helper } from "../contract/types/helpers";
import E_Task from "../entity/task";

const read = {
  desc:0,
  label:0,
  createdAt:0
}



type READ = Helper<E_Task, "desc" | "label" | Extract<TIMESTAMPS, "createdAt">>;
type UPDATE = Helper<E_Task, "desc" | "label">;
type TIMESTAMPS = Helper<E_Task, "createdAt" | "deletedAt" | "updates">;
type CREATE = Helper<E_Task, UPDATE >;
type DELETE = Helper<E_Task, "_id" | "deletedAt">;
type ALL = keyof E_Task;

export { READ, TIMESTAMPS, ALL, CREATE, UPDATE, DELETE };
