import Entity from "../../contract/Entity";
import uid from "../../contract/uid";
import ImageSource from "./ImageSource";
import { NullishNumber } from "../../../core/Nullish";

export default interface Image extends Entity, uid, ImageSource{
  scale?: NullishNumber,
}