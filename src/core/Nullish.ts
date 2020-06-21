import * as Color from "color";

type Nullish<T = never> = T | null | undefined;
type NullishString = Nullish<string>;
type NullishNumber = Nullish<number>;
type NullishBoolean = Nullish<boolean>;
type NullishColor = Nullish<Color>;
type NullishDate = Nullish<Date>;

export {
  Nullish,
  NullishString,
  NullishNumber,
  NullishBoolean,
  NullishColor,
  NullishDate
};
