import Entity from "../../contract/Entity";
import uid from "../../contract/uid";
import { NullishString } from "../../../core/Nullish";
import MetaData from "./MetaData";
import StorageSource from "./StorageSource";
import ILabel from "../../contract/ILabel";

export default interface File
  extends Entity,
    uid,
    StorageSource,
    ILabel {}
