import { Nullish } from "../../../core/Nullish";
import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import Database from "../../../data/contract/Database";

export default interface Source<Options = any>
  extends Entity,
    Database<Options> {}
