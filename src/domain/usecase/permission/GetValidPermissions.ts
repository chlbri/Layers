import I_UseCase from "../../contract/IUseCase";
import E_User from "../../Entities/User";
import { userInfo } from "os";
import UseCase from "../../entities/abr/UseCase";
import { NOmit } from "../../../core/Types";
import { pick, omit, union } from "lodash";
import {
  nOmit,
  convertArrayToObject,
  unionArray,
} from "../../../core/utils";
import { isNullOrUndefined } from "util";
import _Id from "../../contract/_Id";

/**
 * Lister par degré d'importance
 */
export function RecursivePermissions(...args: UseCase[][]) {
  const out: UseCase[] = [];
  for (let index = 0; index < args.length; index++) {
    const step1 = args[index].filter((el) => el.enable);
    /* .map((el) => {
        const om = nOmit(el, "enable");
        return nOmit(el, "enable");
      }) */

    if (index === 0) out.push(...step1);
    else {
      const stringifyStep1 = step1.map((use) =>
        JSON.stringify(nOmit(use, "enable"))
      );
      const stringifyOut = out.map((use) =>
        JSON.stringify(nOmit(use, "enable"))
      );
      const compare = out
        .map((use) => nOmit(use, "enable"))
        .filter((use) =>
          stringifyStep1.includes(JSON.stringify(use))
        );
    }
  }
  return out;
}

function isEnabled(arg: { enable: boolean }) {
  return arg.enable;
}

class GetValidPermissions implements I_UseCase {
  constructor(private user: E_User) {}

  call(
    ...args: any[]
  ): Pick<UseCase, "label" | "type" | "call" | "createdBy">[] {
    const useCases = this.toObject(this.getUseCases());
    const useCasesFromPermissions = this.toObject(
      this.getUseCasesFromPermissions()
    );
    const useCasesFromGroup = this.toObject(
      this.getUseCasesFromGroup()
    );
    const step1 = {
      ...useCasesFromGroup,
      ...useCasesFromPermissions,
      ...useCases,
    };
    const step2 = Object.values(step1)
      .filter((use) => use)
      .map((use) => nOmit(use, "enable"));

    return step2;
  }

  private toObject(useCases: UseCase[]) {
    return convertArrayToObject(useCases, "_id");
  }

  private unionUseCase(array: UseCase[]) {
    return unionArray({
      array,
      isAlreadyIn: this.isAlreadyIn,
      checker: (arg) => arg.enable,
    });
  }

  private isAlreadyIn(arg1: UseCase, arg2: UseCase) {
    return arg1._id === arg2._id;
  }

  private getUseCasesFromPermissions() {
    const out: UseCase[] = [];
    this.user.permissions
      ?.filter(isEnabled)
      .forEach((perm) =>
        perm.useCases
          ?.filter(isEnabled)
          .forEach((use) => out.push(use))
      );
    return this.unionUseCase(out);
  }

  private getUseCases() {
    const out: UseCase[] = [];
    this.user.useCases
      ?.filter(isEnabled)
      .forEach((use) => out.push(use));
    return this.unionUseCase(out);
  }

  private getUseCasesFromGroup() {
    const out: UseCase[] = [];
    this.user.permissionGroups?.forEach((group) =>
      group.permissions
        ?.filter(isEnabled)
        .forEach((perm) =>
          perm.useCases
            ?.filter(isEnabled)
            .forEach((use) => out.push(use))
        )
    );
    return this.unionUseCase(out);
  }
}

