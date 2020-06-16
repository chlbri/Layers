import Entity from "../../contract/Entity";
import uid from "../../contract/uid";
import Source from "./Source";
import { Nullish } from "../../../core/Nullish";
import ILabel from "../../contract/ILabel";
import IRepo from "../../../data/contract/IRepo";

export default interface Repo<E extends Entity>
  extends Entity,
    uid,
    ILabel,
    IRepo<E> {
  sources?: Nullish<Source[]>;
}
