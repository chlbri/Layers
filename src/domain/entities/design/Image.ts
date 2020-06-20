import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import ImageSource from "./ImageSource";
import { NullishNumber } from "../../../core/Nullish";

export default interface Image extends Entity, _Id, ImageSource{
  scale?: NullishNumber,
}