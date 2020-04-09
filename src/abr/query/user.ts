import E_User from "../../ebr/entity/user";

import { NAME, ALL, DELETE, CREDENTIALS, CREATE, UPDATE } from "../../ebr/helpers/user";

import _Id from "../../ebr/contract/_Id";
import { ResultOne, Query } from "../contract/queries";

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
