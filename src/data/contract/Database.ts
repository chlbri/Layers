import CRUD from "../../domain/contract/repo/crud";
import { DataTypes } from "../../domain/contract/Datatypes";
import { Nullish, NullishString } from "../../core/Nullish";
import Entity from "../../domain/contract/Entity";

export default interface Database<Options = any>  {
  url: string;
  dbName: string;
  options?: Options;
}
