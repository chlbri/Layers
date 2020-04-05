import { QuerySchema } from "../../ia/gateway/contracts/Types";
import E_User from "../entity/user";

type CREDENTIALS = QuerySchema<E_User, "login" | "mdp">;

type NAME = QuerySchema<E_User, "firstnames" | "lastname">;

type CREATE = QuerySchema<E_User, "_id" | NAME | CREDENTIALS>;

type DELETE = QuerySchema<E_User, "_id" | NAME>;

type TIMESTAMPS = QuerySchema<E_User, "createdAt" | "deletedAt" | "updates">;

type ALL = CREDENTIALS | NAME | CREATE | TIMESTAMPS | DELETE;

export { CREDENTIALS, NAME, CREATE, TIMESTAMPS, ALL, DELETE };
