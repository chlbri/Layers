import Entity from "../contract/Entity";
import _Id from "../contract/_Id";
import { NullishString } from "../../core/Nullish";
import { Nullish } from "../../core/Nullish";
import Piped from "../contract/Piped";
import ILabel from "../contract/ILabel";

export default interface E_Pipe
  extends Entity,
    _Id,
    Piped,
    ILabel {}
