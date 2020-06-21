import _Id from "../../contract/_Id";
import { Nullish } from "../../../core/Nullish";
import Entity from "../../contract/Entity";
import UseCase from "../abr/UseCase";

export default interface E_Permission extends Entity, _Id {
  label: Nullish<string>;
  useCases?: Nullish<UseCase[]>;
  enable: boolean;
}
