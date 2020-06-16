import * as Color from "color";

type Nullish<T extends {}> = T | null | undefined;
type NullishString = Nullish<string>;
type NullishNumber = Nullish<number>;
type NullishBoolean = Nullish<boolean>;
type NullishColor = Nullish<Color>;

export {
  Nullish,
  NullishString,
  NullishNumber,
  NullishBoolean,
  NullishColor,
};
