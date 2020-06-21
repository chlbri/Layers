import Entity from "../Entity";
import { NullishString, Nullish } from "../../../core/Nullish";
import MetaData from "./MetaData";

export default interface StorageSource {
  uri: string;
  metadata?: Nullish<MetaData>;
}
