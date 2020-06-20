import { NullishBoolean, Nullish } from "../../core/Nullish";

type DataTypes =
  | Nullish
  | boolean
  | string
  | number
  | Date
  | Array<DataTypes>
  | Map<string, DataTypes>;

export { DataTypes };
