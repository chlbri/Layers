import  Measure  from "../design/Measure";
import Alignment from "../design/Alignment";
import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import { NullishNumber } from "../../../core/Nullish";

export default interface Animation extends Entity {
  transform?: "rotation" | "scale" | "translate" | "skew";
  rotation?: NullishNumber;
  /**
   * Valeur par défaut : "Center"
   */
  center: Alignment;
  x?: Measure;
  y?: Measure;
  z?: Measure;
  /**
   * En millisecondes
   */
  duration: number;
  decay?: NullishNumber;
}
