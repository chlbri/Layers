import Permission from "../../entities/permission/Permission";
import PermissionGroup from "../../entities/permission/Group";
import UseCase from "../../entities/abr/UseCase";

type PermissionSet = Permission | PermissionGroup | UseCase;
type PermissionGet = [UseCase, Permission?, PermissionGroup?];

export { PermissionSet, PermissionGet };
