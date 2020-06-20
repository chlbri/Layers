import { isNil, isArray } from "lodash";

export default function isNilEvery<T extends any[]>(...args: T) {
  return args.every((val) => {
    if (isArray(val)) {
      isNilEvery(val);
    } else {
      return !val;
    }
  });
}

function isNilAny<T extends any[]>(...args: T) {
  return args.some((val) => {
    if (isArray(val)) {
      isNilAny(val);
    } else {
      return !val;
    }
  });
}

export { isNilAny };
