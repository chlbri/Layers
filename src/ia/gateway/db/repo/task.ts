import ValidateBy from "../contract/validate_by";
import IRepo from "../contract/IRepo";
import E_Task from "../../../../ebr/entity/task";
import Queries from "../../../../abr/query/task";
import ICopy from "../contract/ICopy";

export interface IRepo_Task
  extends IRepo,
    E_Task,
    Queries,
    ValidateBy<E_Task>,ICopy<IRepo_Task>
 {}
