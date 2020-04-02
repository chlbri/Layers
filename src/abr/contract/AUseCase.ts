import ARepo from "./ARepo";
import Generator from "../../ia/gateway/contracts/Validator";
import Schema from "../../ebr/contract/ISchema";
import Entity from "../../ebr/contract/Entity";

export default abstract class AUseCase<R extends ARepo[], E> {
  args: R;

  constructor(...args: R) {
    this.args = args;
  }

  abstract get exec(): E;
}
