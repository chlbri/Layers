import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import { NullishString } from "../../../core/Nullish";
import MetaData from "../../contract/storage/MetaData";
import StorageSource from "../../contract/storage/StorageSource";
import ILabel from "../../contract/ILabel";
import E_File from "./File";

export default interface E_Folder extends E_File {
  isEmpty: boolean;
}
