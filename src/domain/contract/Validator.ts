import S, { SchemaProperty } from "./Schema";
import Entity from "./Entity";

export default class Validator<T extends Entity> {
  constructor(public schema: S<T>) {}

  validate(...args: Partial<T>[]) {
    const propParams = this.schema.propParams;
    const classParams = this.schema.classParams;
    if (propParams) {
      if (!args.every(this.validateParams(propParams))) return false;
    }
    if (classParams) {
      return args.every((val) => !classParams(val));
    }
    return true;
  }

  private validateParams(propParams: SchemaProperty<Partial<T>>) {
    return (arg: Partial<T>) => {
      for (const key in arg) {
        if (!arg.hasOwnProperty(key)) continue;
        const check = propParams[key];
        if (!check) continue;
        return !check(arg[key]);
      }
      return true;
    };
  }
}
