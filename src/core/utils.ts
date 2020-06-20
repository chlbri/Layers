import { pick, omit } from "lodash";
import { OnlyFieldsOfType } from "mongodb";
import { Nullish } from "./Nullish";
import { Condition } from "../domain/contract/Schema";

function Reverse(arg: {
  [r: number]: string;
}): {
  [r: string]: number;
} {
  const vals = Object.values(arg);

  const reverse: { [r: string]: number } = {};
  for (const key in arg) {
    if (arg.hasOwnProperty(key)) {
      const el = arg[key];
      reverse[el] = parseInt(key);
    }
  }

  return reverse;
}

function nOmit<T extends object, K extends (keyof T)[]>(
  obj: Nullish<T>,
  ...keys: K
) {
  return omit(obj, ...keys);
}

function convertArrayToObject<T extends object, K extends keyof T>(
  array: T[],
  key: K
): { [r: string]: Omit<T, K> } {
  return Object.assign(
    {},
    ...array.map((el) => {
      const innerKey = (el[key] as any) as string;
      return { [innerKey]: omit(el, key) };
    })
  );
}

type unionArrayArgs<T> = {
  array: T[];
  isAlreadyIn: (arg1: T, arg2: T) => boolean;
  checker?: Nullish<Condition<T>>;
};

function unionArray<T extends object>(args: unionArrayArgs<T>) {
  const out: T[] = [];
  for (const arg of args.array) {
    const alReadyIn = args.array.find((el) =>
      args.isAlreadyIn(el, arg)
    );
    const inChecker =
      !alReadyIn || !args.checker || args.checker(alReadyIn);
    if (inChecker) out.push(arg);
  }
  return out;
}

export { Reverse, nOmit, convertArrayToObject, unionArray };
