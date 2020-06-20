import Database from "./Database";
import CRUD from "../../domain/contract/repo/crud";
import Entity from "../../domain/contract/Entity";
import { Nullish } from "../../core/Nullish";

export default interface SourceConfig<T> {
  url: string;
  dbName: string;
  options?: Nullish<T>;
}
