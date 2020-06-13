import Entity from "./Entity";
import { Without } from "../../core/Types";

export const CopyWith = <T>(sealed: T, change: T) => ({
  ...sealed,
  ...change,
});
