import S from "../../../ebr/contract/ISchema";

export default class Validator<T> {
  constructor(public schema: S<T>) {}

  validate(arg: T) {
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
