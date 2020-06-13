import E_User from "../entities/user";
import { Helper } from "../contract/helper";

type CREDENTIALS = Helper<E_User, "login" | "mdp">;

type NAME = Helper<E_User, "firstnames" | "lastname">;

type CREATE = Helper<E_User, "uid" | NAME | CREDENTIALS>;
type UPDATE = Helper<E_User,  NAME | CREDENTIALS>;

type DELETE = Helper<E_User, "uid" | NAME>;

type TIMESTAMPS = Helper<E_User, "createdAt" | "deletedAt" >;

type ALL = CREDENTIALS | NAME | CREATE | TIMESTAMPS | DELETE | UPDATE;

export { CREDENTIALS, NAME, CREATE, TIMESTAMPS, ALL, DELETE, UPDATE };
