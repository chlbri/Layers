import ARepo from "../../../abr/contract/ARepo";
import Generator from "./Validator";
import Schema from "../../../ebr/contract/ISchema";
import Entity from "../../../ebr/contract/Entity";
import Validator from "./Validator";

export default abstract class Mutation<T extends Entity> {
  constructor(public validator: Validator<T>) {
  }
}

