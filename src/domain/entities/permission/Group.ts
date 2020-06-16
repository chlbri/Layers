import uid from "../../contract/uid";
import Entity from "../../contract/Entity";
import { Nullish, NullishString } from "../../../core/Nullish";
import Permission from "./Permission";

export default interface PermissionGroup extends uid, Entity {
  enable: Nullish<boolean>;
  label: NullishString;
  permissions?: Nullish<Permission[]>;
}
