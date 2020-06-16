import Entity from "../../contract/Entity";
import uid from "../../contract/uid";
import View from "../design/View";
import { Nullish, NullishString } from "../../../core/Nullish";
import UseCase from "../abr/UseCase";

export default interface Screen extends Entity, uid {
  
  label: NullishString;
  children?: Nullish<View[]>;
  useCases?: Nullish<UseCase[]>;
}
