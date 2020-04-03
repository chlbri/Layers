import {
  QuerySchema,
  Bulk,
  CreateOne,
  ReadOne,
  UpdateOne,
  DeleteOne
} from "../contracts/Types";
import E_User from "../../../ebr/entity/E_User";

type CREDENTIALS = QuerySchema<E_User, "login" | "mdp">;

type NAME = QuerySchema<E_User, "firstnames" | "lastname">;

type CREATE = QuerySchema<
  E_User,
  "_id" | NAME | CREDENTIALS
>;

type DELETE = QuerySchema<E_User, "_id" | NAME>;

type TIMESTAMPS = QuerySchema<E_User, "createdAt" | "deletedAt" | "updates">;

type ALL = CREDENTIALS | NAME | CREATE | TIMESTAMPS;

export { CREDENTIALS, NAME, CREATE, TIMESTAMPS, ALL, DELETE };
