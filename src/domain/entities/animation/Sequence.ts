import Entity from "../../contract/Entity";
import uid from "../../contract/uid";
import { NullishNumber } from "../../../core/Nullish";
import Animation from "./Animation";

export default interface Sequence extends Entity, uid {
  transforms: (Animation & { start?: NullishNumber })[];

  /**
   * En millisecondes, doit être plus grand que le cumul 
   * des durées des transforms dans le temps.
   * Ce la peut être un getter.
   */
  duration: number;
  decay?: NullishNumber;
}
