import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import View from "../design/View";
import { Nullish, NullishString } from "../../../core/Nullish";
import UseCase from "../abr/UseCase";

export default interface Screen extends Entity, _Id {
  
  label: NullishString;
  children?: Nullish<View[]>;
  useCases?: Nullish<UseCase[]>;
}
