
import E_User from "../../../../ebr/entity/user";
import ValidateBy from "../contract/validate_by";
import Queries from "../../../../abr/query/user";
import IRepo from "../contract/IRepo";
import ICopy from "../contract/ICopy";


export interface IRepo_User extends IRepo, E_User, Queries, ValidateBy<E_User>, ICopy<IRepo_User> {}

