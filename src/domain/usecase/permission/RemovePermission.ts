import IData_UseCase from "../../contract/IDataUseCase";
import Permission from "../../entities/permission/Permission";
import Validator from "../../contract/Validator";
import PermissionGroup from "../../entities/permission/Group";
import UseCase from "../../entities/abr/UseCase";
import E_User from "../../Entities/User";
import { PermissionSet } from "./helpers";

export default class RemovePermission
  implements IData_UseCase<PermissionSet> {
  constructor(public validator: Validator<Permission>) {}
  call(remove: PermissionSet, user: E_User) {
    throw new Error("Method not implemented.");
  }
}
