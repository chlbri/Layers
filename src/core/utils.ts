const isNullOrUndefined = require("util").isNullOrUndefined;
import { pick, omit } from "lodash";
import { OnlyFieldsOfType } from "mongodb";
import { Nullish } from "./Nullish";
import { Condition } from "../domain/contract/Schema";
import { extname } from "path";

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
  key: K,
  omit = false
): { [r: string]: T } {
  return Object.assign(
    {},
    ...array.map((el) => {
      const innerKey = (el[key] as any) as string;
      return { [innerKey]: omit ? nOmit(el, key) : el };
    })
  );
}

function checkExtension(path: string, ...checkers: string[]) {
  for (const checker of checkers) {
    if (extname(path).toLowerCase() === checker.toLowerCase())
      return true;
  }
  return false;
}

type unionArrayArgs<T> = {
  array: T[];
  avoid?: (arg1: T, arg2: T) => boolean;
};

function unionArray<T extends {}>(args: unionArrayArgs<T>) {
  const out: T[] = [];
  const avoid = args.avoid;
  for (const arg of args.array) {
    const checker = out.some((el) =>
      avoid ? avoid(el, arg) : el === arg
    );
    if (!checker) out.push(arg);
  }
  return out;
}

export {
  Reverse,
  nOmit,
  convertArrayToObject,
  unionArray,
  checkExtension,
};
