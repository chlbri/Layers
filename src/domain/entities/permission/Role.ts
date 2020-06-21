import _Id from "../../contract/_Id";
import Entity from "../../contract/Entity";
import { Nullish, NullishString } from "../../../core/Nullish";
import E_Permission from "./Permission";

export default interface E_PermissionRole extends _Id, Entity {
  enable: boolean;
  label: NullishString;
  permissions?: Nullish<E_Permission[]>;
}
