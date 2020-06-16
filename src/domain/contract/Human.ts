import Entity from "./Entity";
import { NullishString } from "../../core/Nullish";

export default interface Human extends Entity{
  firsNames?: NullishString;
  lastName?: NullishString;
}