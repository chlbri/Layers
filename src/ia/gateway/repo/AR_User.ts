import Validator from "../contracts/Validator";
import {
  CreateOneUser,
  ReadOneUser,
  UpdateOneUser,
  DeleteOneUser,
  BulkUser
} from "../query/Q_User";
import { CREATE, CREDENTIALS, ALL, NAME, DELETE } from "../query_schema/QS_User";
import IRepoEntity from "../contracts/Repo";
import E_User from "../../../ebr/entity/E_User";
import { EntityQuery } from "../contracts/Types";

export default class AR_User extends IRepoEntity<E_User> {
  validator: Validator<E_User>;
  constructor(...validators: Validator<E_User>[]) {
    super();
    this.validator = validators[0];
  }
  create: CreateOneUser<NAME>;
  read: ReadOneUser;
  update: UpdateOneUser<NAME>;
  delete: DeleteOneUser<ALL>;
  login: BulkUser<DELETE>;
}
