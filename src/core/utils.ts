import { pick } from "lodash";
import { OnlyFieldsOfType } from "mongodb";

function ExcludeNull<T extends {}>(arg: T) {
  const tab = [];
  for (const key in arg) {
    if (arg.hasOwnProperty(key)) {
      const el = arg[key];
      if (el) tab.push(key);
    }
  }
  return pick(arg, ...tab);
}

function Reverse(arg: { [r: number]: string }) {
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

export { Reverse, ExcludeNull };
