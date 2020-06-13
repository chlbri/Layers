import { pick } from "lodash";
import { OnlyFieldsOfType } from "mongodb";




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

export { Reverse };
