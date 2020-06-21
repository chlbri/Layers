import Entity from "./Entity";
import { isNullOrUndefined } from "util";

export default function CopyWith<T>(sealed: T, change: Partial<T>) {
  const out = { ...sealed };

  for (const key in change) {
    if (change.hasOwnProperty(key)) {
      const el = change[key];
      if(!isNullOrUndefined(el)) out[key] = el!;
    }
  }
  return out;
}
