import Entity from "../../contract/Entity";
import { NullishString, Nullish } from "../../../core/Nullish";
import MetaData from "./MetaData";

export default interface StorageSource extends Entity {
  uri: string;
  metadata?: Nullish<MetaData>;
}
