import S from "./ISchema";

export default class<T> {
  constructor(
    public schema: S<T>,
  ) {}
  readonly generate = (arg: T) => {
    for (const key in arg) {
      const check = this.schema.propParams[key](arg[key]);
      if (!check) return;
    }
    if(this.schema.classParams && !this.schema.classParams(arg)){
      return
    }
    return arg;
  };
}
