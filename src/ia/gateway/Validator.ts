import S from "../../ebr/contract/types/schema";

export default class Validator<T> {
  constructor(public schema: S<T>) {}

  validate(...args: Partial<T>[]) {
    for (const arg of args) {
      for (const key in arg) {
        if (arg.hasOwnProperty(key)) {
          const check = this.schema.propParams[key](arg[key]);
          if (!check) return false;
        }
      }
      if (this.schema.classParams && !this.schema.classParams(arg)) {
        return false;
      }
    }
    return true;
  }
}
