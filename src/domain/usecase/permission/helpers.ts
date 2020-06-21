import E_Permission from "../../entities/permission/Permission";
import E_PermissionGroup from "../../entities/permission/Group";
import UseCase from "../../entities/abr/UseCase";
import E_PermissionRole from "../../Entities/permission/Role";

type PermissionSet =
  | E_Permission
  | E_PermissionGroup
  | E_PermissionRole
  | UseCase;

type PermissionGet = [
  UseCase,
  E_Permission?,
  E_PermissionRole?,
  E_PermissionGroup?
];

export { PermissionSet, PermissionGet };
