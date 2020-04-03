import S from "../../../ebr/contract/ISchema";
import Entity from "../../../ebr/contract/Entity";

export default class Validator<T> {
  constructor(public schema: S<T>) {}

  validate(...args: T[]) {
    for (const arg of args) {
      for (const key in arg) {
        const check = this.schema.propParams[key](arg[key]);
        if (!check) return;
      }
      if (this.schema.classParams && !this.schema.classParams(arg)) {
        return;
      }
      return arg;
    }
  }
}
