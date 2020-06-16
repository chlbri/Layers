import {
  NullishString,
} from "../../../core/Nullish";
import Entity from "../../contract/Entity";
import uid from "../../contract/uid";
import MetaData from "../storage/MetaData";
import StorageSource from "../storage/StorageSource";

export default interface ImageSource extends Entity, uid, StorageSource {
  width: number;
  heigth: number;
}
