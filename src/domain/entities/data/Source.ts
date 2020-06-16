import { Nullish } from "../../../core/Nullish";
import Entity from "../../contract/Entity";
import uid from "../../contract/uid";

type NString = Nullish<string>;

export default interface Source extends Entity, uid {
  [P: string]: NString;
  host?: NString;
  login?: NString;
  pwd?: NString;
  table: NString;
  database?: NString;
}