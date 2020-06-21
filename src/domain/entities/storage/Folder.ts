import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import { NullishString } from "../../../core/Nullish";
import MetaData from "../../contract/storage/MetaData";
import StorageSource from "../../contract/storage/StorageSource";
import ILabel from "../../contract/ILabel";

export default interface E_Folder
  extends Entity,
    _Id,
    StorageSource,
    ILabel {
  isEmpty: boolean;
}
