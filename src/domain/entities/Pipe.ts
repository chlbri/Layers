import Entity from "../contract/Entity";
import _Id from "../contract/_Id";
import { NullishString } from "../../core/Nullish";
import { Nullish } from "../../core/Nullish";
import Piped from "../contract/Piped";

export default interface E_Pipe<Output>
  extends Entity,
    _Id,
    Piped
     {
  label?: NullishString;
}
