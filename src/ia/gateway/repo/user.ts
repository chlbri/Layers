import Validator from "../contracts/Validator";
import {
  CreateOneUser,
  ReadOneUser,
  UpdateOneUser,
  DeleteOneUser,
  BulkUser
} from "../query/user";
import {
  CREATE,
  CREDENTIALS,
  ALL,
  NAME,
  DELETE
} from "../../../ebr/helpers/user";
import IRepoEntity from "../contracts/Repo";
import E_User from "../../../ebr/entity/user";
import { EntityQuery } from "../contracts/Types";

export default class Repo_User extends IRepoEntity<E_User> {
  create!: CreateOneUser<NAME>;
  read!: ReadOneUser;
  update!: UpdateOneUser<NAME>;
  delete!: DeleteOneUser<DELETE>;
  login!: BulkUser<CREDENTIALS>;
}
