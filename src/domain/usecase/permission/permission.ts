import IUseCase from "../../contract/IUseCase";
import E_User from "../../Entities/User";
import { userInfo } from "os";
import { NOmit } from "../../../core/Types";
import { pick, omit, union } from "lodash";
import {
  nOmit,
  convertArrayToObject,
  unionArray,
} from "../../../core/utils";
import { isNullOrUndefined } from "util";
import _Id from "../../contract/_Id";
import UseCase from "../../Entities/abr/UseCase";
import E_Permission from "../../Entities/permission/Permission";

/**
 * Lister par degré d'importance
 */

//#region Features
function isEnabled<T extends { enable?: boolean }>(arg: T) {
  return !!arg.enable;
}

function toObject(useCases: UseCase[]) {
  return convertArrayToObject(useCases, "_id");
}

function unionUseCase(array: UseCase[]) {
  return unionArray({
    array,
    avoid: avoid,
  });
}

function avoid(arg1: UseCase, arg2: UseCase) {
  return arg1._id === arg2._id && !arg2.enable;
}

function getUseCasesFromPermissions(user: E_User) {
  const out: UseCase[] = [];
  user.permissions
    ?.filter(isEnabled)
    .forEach((perm) =>
      perm.useCases?.filter(isEnabled).forEach((use) => out.push(use))
    );
  return unionUseCase(out);
}

function getUseCases(user: E_User) {
  const out: UseCase[] = [];
  user.useCases?.filter(isEnabled).forEach((use) => out.push(use));
  return unionUseCase(out);
}

function getUseCasesFromGroups(user: E_User) {
  const out: UseCase[] = [];
  user.permissionGroups?.forEach((group) =>
    group.permissions
      ?.filter(isEnabled)
      .forEach((perm) =>
        perm.useCases
          ?.filter(isEnabled)
          .forEach((use) => out.push(use))
      )
  );
  return unionUseCase(out);
}

function getUseCasesFromRoles(user: E_User) {
  const out: UseCase[] = [];
  user.permissionRoles?.forEach((role) =>
    role.permissions
      ?.filter(isEnabled)
      .forEach((perm) =>
        perm.useCases
          ?.filter(isEnabled)
          .forEach((use) => out.push(use))
      )
  );
  return unionUseCase(out);
}
//#endregion

const _get = {
  call(user: E_User) {
    const useCases = toObject(getUseCases(user));
    const useCasesFromPermissions = toObject(
      getUseCasesFromPermissions(user)
    );
    const useCasesFromGroups = toObject(getUseCasesFromRoles(user));
    const useCasesFromRoles = toObject(getUseCasesFromGroups(user));
    const step1 = {
      ...useCasesFromGroups,
      ...useCasesFromRoles,
      ...useCasesFromPermissions,
      ...useCases,
    };
    const step2 = Object.values(step1)
      .filter((use) => use)
      .map((use) => nOmit(use, "enable"));

    return step2;
  },
} as const;

const _give = {
  call(give: E_Permission, user: E_User) {
    throw new Error("Method not implemented.");
  },
} as const;

const _remove = {
  call(remove: E_Permission, user: E_User) {
    throw new Error("Method not implemented.");
  },
};

const domain = {
  _get,
  _give,
  _remove,
} as const;

export default domain;
