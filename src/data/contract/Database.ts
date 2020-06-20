import CRUD from "../../domain/contract/repo/crud";
import { DataTypes } from "../../domain/contract/Datatypes";
import { Nullish, NullishString } from "../../core/Nullish";

type SourceOptions = {
  [P: string]: NullishString;
  host: string;
  credentials: any;
  database: string;
};

export default interface Database{
  options?: SourceOptions;
}
