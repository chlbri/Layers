import Entity from "../contract/Entity";
import ITimestamps from "../contract/ITimestamps";
import { NullishString, Nullish } from "../../core/Nullish";

export default interface Mail extends Entity, ITimestamps {
  msg: string;
  dest: string;
  exp: string;
  obj?: NullishString;
  cc?: NullishString;
  cci?: Nullish<NullishString[]>;
}
