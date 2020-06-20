import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import { NullishString } from "../../../core/Nullish";
import MetaData from "./MetaData";
import StorageSource from "./StorageSource";
import ILabel from "../../contract/ILabel";

export default interface File
  extends Entity,
    _Id,
    StorageSource,
    ILabel {}
