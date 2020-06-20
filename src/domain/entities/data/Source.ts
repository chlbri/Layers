import { Nullish } from "../../../core/Nullish";
import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";

type NString = Nullish<string>;

export default interface Source extends Entity, _Id {
  [P: string]: NString;
  host?: NString;
  login?: NString;
  pwd?: NString;
  table: NString;
  database?: NString;
}