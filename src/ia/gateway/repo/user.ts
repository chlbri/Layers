import Validator from "../../../ebr/contract/Validator";

import {
  CREATE,
  CREDENTIALS,
  ALL,
  NAME,
  DELETE
} from "../../../ebr/helpers/user";
import E_User from "../../../ebr/entity/user";
import ValidateBy from "../contracts/validate_by";
import Queries from "../../../abr/query/user";

export interface IRepo_User extends E_User, Queries, ValidateBy<E_User> {}
