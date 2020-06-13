import Entity from "./Entity";
import { Without } from "../../core/Types";

export default function CopyWith<T extends Entity>(
  sealed: T,
  change: T
) {
  return { ...sealed, ...change };
}
