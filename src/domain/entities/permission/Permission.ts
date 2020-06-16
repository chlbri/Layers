import uid from "../../contract/uid";
import { Nullish } from "../../../core/Nullish";
import Entity from "../../contract/Entity";
import UseCase from "../abr/UseCase";

export default interface Permission extends Entity, uid {
  label: Nullish<string>;
  useCases?: Nullish<UseCase[]>;
  enable: boolean;
}
