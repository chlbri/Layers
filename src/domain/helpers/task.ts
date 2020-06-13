import { Helper } from "../contract/helper";
import E_Task from "../entities/task";


type C = keyof E_Task;

type READ = Helper<E_Task, "desc" | "label" | Extract<TIMESTAMPS, "createdAt">>;
type UPDATE = Helper<E_Task, "desc" | "label">;
type TIMESTAMPS = Helper<E_Task, "createdAt" | "deletedAt">;
type CREATE = Helper<E_Task, UPDATE>;
type DELETE = Helper<E_Task, "uid" | "deletedAt">;
type ALL = keyof E_Task;

export { READ, TIMESTAMPS, ALL, CREATE, UPDATE, DELETE };

