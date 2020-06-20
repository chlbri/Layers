import _Id from "../../contract/_Id";
import Entity from "../../contract/Entity";
import { Nullish, NullishString } from "../../../core/Nullish";
import Permission from "./Permission";

export default interface PermissionGroup extends _Id, Entity {
  enable: Nullish<boolean>;
  label: NullishString;
  permissions?: Nullish<Permission[]>;
}
