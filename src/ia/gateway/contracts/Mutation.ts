import Entity from "../../../ebr/contract/Entity";
import Validator from "./Validator";
import ITimestamps from "../../../ebr/contract/ITimestamps";

export default class Create<T extends Entity> {
  constructor(public validator: Validator<T>, args: T) {
  }

  arg!: (...args:[]) => any;

  exec() {
    return this.validator.validate(this.arg());
  }
}

class Toto<T extends ITimestamps<Entity>> {
  constructor(params: T) {}
}

const c = new Toto({});
