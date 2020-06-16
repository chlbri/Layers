import Entity from "../contract/Entity";
import uid from "../contract/uid";
import { NullishString } from "../../core/Nullish";
import { Pipe as p } from "../contract/Pipe";
import { Nullish } from "../../core/Nullish";

export default interface Pipe<Input, Output> extends Entity, uid {
  label?: NullishString;
  pipe?: Nullish<p<Input, Output>>;
}
