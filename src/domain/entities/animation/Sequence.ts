import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import { NullishNumber } from "../../../core/Nullish";
import Animation from "./Animation";

export default interface AnimationSequence extends Entity {
  anims?: (Animation & { start: number })[];
  _id?: string;


  decay?: NullishNumber;
}
