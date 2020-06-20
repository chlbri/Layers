import { Measure } from "../design/Measure";
import Center from "../design/Center";
import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import { NullishNumber } from "../../../core/Nullish";

export default interface Animation extends Entity, _Id {
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
