import { Measure } from "../design/Measure";
import Center from "../design/Center";
import Entity from "../../contract/Entity";
import uid from "../../contract/uid";
import { NullishNumber } from "../../../core/Nullish";

export default interface Animation extends Entity, uid {
  transform?: "rotation" | "scale" | "translate" | "skew";
  rotation?: NullishNumber;
  /**
   * Valeur par défaut : "Center"
   */
  center: Center;
  x?: Measure;
  y?: Measure;
  z?: Measure;
  /**
   * En millisecondes
   */
  duration: NullishNumber;
  decay?: NullishNumber;
}
