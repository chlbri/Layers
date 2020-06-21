import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import Source from "./Source";
import { Nullish } from "../../../core/Nullish";
import ILabel from "../../contract/ILabel";
import IRepo from "../../contract/repo/IRepo";

export default interface Repo<E extends Entity>
  extends Entity,
    _Id,
    ILabel,
    IRepo<E> {
}
