import E_User from "../entity/user";
import { Helper } from "../contract/types/helpers";

type CREDENTIALS = Helper<E_User, "login" | "mdp">;

type NAME = Helper<E_User, "firstnames" | "lastname">;

type CREATE = Helper<E_User, "_id" | NAME | CREDENTIALS>;
type UPDATE = Helper<E_User,  NAME | CREDENTIALS>;

type DELETE = Helper<E_User, "_id" | NAME>;

type TIMESTAMPS = Helper<E_User, "createdAt" | "deletedAt" | "updates">;

type ALL = CREDENTIALS | NAME | CREATE | TIMESTAMPS | DELETE | UPDATE;

export { CREDENTIALS, NAME, CREATE, TIMESTAMPS, ALL, DELETE, UPDATE };
