import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import E_View from "../design/View";
import { Nullish, NullishString } from "../../../core/Nullish";
import UseCase from "../abr/UseCase";

export default interface E_Screen extends Entity {  
  label: NullishString;
  children?: Nullish<E_View[]>;
  useCases?: Nullish<UseCase[]>;
}
