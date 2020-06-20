import _Id from "../contract/_Id";
import ITimestamps from "../contract/ITimestamps";
import Entity from "../contract/Entity";
import IUpdates from "../contract/IUpdates";
import { Helper } from "../contract/helper";
import { NullishString, Nullish } from "../../core/Nullish";
import Permission from "./permission/Permission";
import UseCase from "./abr/UseCase";
import PermissionGroup from "./permission/Group";

type CREDENTIALS = Helper<E_User, "login" | "mdp">;

type NAME = Helper<E_User, "firstnames" | "lastname">;

type CREATE = Helper<E_User, "_id" | NAME | CREDENTIALS>;
type UPDATE = Helper<E_User, NAME | CREDENTIALS>;

type DELETE = Helper<E_User, "_id" | NAME>;

type TIMESTAMPS = Helper<E_User, "createdAt" | "deletedAt">;

type ALL = CREDENTIALS | NAME | CREATE | TIMESTAMPS | DELETE | UPDATE;

export { CREDENTIALS, NAME, CREATE, TIMESTAMPS, ALL, DELETE, UPDATE };

export default interface E_User
  extends Entity,
    _Id,
    ITimestamps,
    IUpdates {
  firstnames?: NullishString;
  lastname?: NullishString;
  login?: NullishString;
  mdp?: NullishString;
  useCases?: UseCase[];
  permissions?: Nullish<Permission[]>;
  permissionGroups?: Nullish<PermissionGroup[]>;
}
