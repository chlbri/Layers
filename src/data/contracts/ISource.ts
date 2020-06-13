import CRUD from "../../domain/contract/crud";
import { DataTypes } from "../../domain/contract/utils";
import { Nullish } from "../../core/Types";

type NString = Nullish<string>;

type SourceOptions = {
  [P: string]: NString;
  host?: NString;
  login?: NString;
  pwd?: NString;
  "collection/table": NString;
  database?: NString;
};

export default interface ISource<T> extends CRUD<T> {
  options?: SourceOptions;
}

const c: SourceOptions = {
  "collection/table": undefined,
};
