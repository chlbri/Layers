import IRepo from "../contract/IRepo";
import { Helper } from "../../../ebr/contract/types/helpers";
import E_User from "../../../ebr/entity/user";
import { ResultOne, Query } from "../../../abr/contract/queries";
import ValidateBy from "../contract/validate_by";
import ICopy from "../contract/ICopy";


type CREDENTIALS = Helper<E_User, "login" | "mdp">;

type NAME = Helper<E_User, "firstnames" | "lastname">;

type CREATE = Helper<E_User, "_id" | NAME | CREDENTIALS>;
type UPDATE = Helper<E_User,  NAME | CREDENTIALS>;

type DELETE = Helper<E_User, "_id" | NAME>;

type TIMESTAMPS = Helper<E_User, "createdAt" | "deletedAt" | "updates">;

type ALL = CREDENTIALS | NAME | CREATE | TIMESTAMPS | DELETE | UPDATE;

export { CREDENTIALS, NAME, CREATE, TIMESTAMPS, ALL, DELETE, UPDATE };




type R<T extends ALL> = ResultOne<E_User, T>;

type UserCreated = R<NAME>;
type UserRead = R<CREATE>;
type UserUpdated = R<UPDATE>;
type UserDeleted = R<DELETE>;
type UserLogged = R<CREDENTIALS>;

export default interface Queries {
  q_create: Query<UserCreated>;
  q_read: Query<UserRead>;
  q_update: Query<UserUpdated>;
  q_delete: Query<UserDeleted>;
  q_login: Query<UserLogged>;
}

export { UserCreated, UserRead , UserUpdated, UserDeleted, UserLogged };

export interface IRepo_User
  extends IRepo,
    E_User,
    Queries,
    ValidateBy<E_User>,
    ICopy<IRepo_User> {}
