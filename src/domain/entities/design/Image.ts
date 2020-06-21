import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import { NullishNumber } from "../../../core/Nullish";
import StorageSource from "../../contract/storage/StorageSource";


export default interface E_Image extends Entity,  StorageSource{
  scale?: NullishNumber,
  width: number;
  heigth: number;
}