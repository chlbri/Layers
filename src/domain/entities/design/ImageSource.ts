import {
  NullishString,
} from "../../../core/Nullish";
import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import MetaData from "../storage/MetaData";
import StorageSource from "../storage/StorageSource";

export default interface ImageSource extends Entity, _Id, StorageSource {
  width: number;
  heigth: number;
}
