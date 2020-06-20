import IData_UseCase from "../../contract/IDataUseCase";
import Permission from "../../entities/permission/Permission";
import Validator from "../../contract/Validator";
import E_User from "../../Entities/User";
import {PermissionSet} from "./helpers";

export default class GivePermission
  implements IData_UseCase<PermissionSet> {
  constructor(public validator: Validator<PermissionSet>) {}
  call(give: PermissionSet, user: E_User) {
    throw new Error("Method not implemented.");
  }
}
