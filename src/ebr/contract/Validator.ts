import S from "./types/schema";
import Entity from "./Entity";

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

class Tot{
  get toMap() {
    return {
      label: "this.label",
      desc: "this.desc",
      createdAt: "this.createdAt",
      updates: "this.updates",
      deletedAt: "this.deletedAt",
      _id: "this._id"
    };
  }
  toMapQuery() {
    const toCompute = this.toMap;
    const tab = [];
    let out = {};
    for (const key in toCompute) {
      if (toCompute.hasOwnProperty(key)) {
        const element = toCompute;
        
      }
    }



  }
}

