import Entity from "../../contract/Entity";
import uid from "../../contract/uid";
import { NullishString } from "../../../core/Nullish";
import I_UseCase from "../../contract/I_UseCase";
import ILabel from "../../contract/ILabel";
import CreatedBy from "../../contract/CreatedBy";
import TypePermission from "../permission/type";
import { NRequired } from "../../../core/Types";

export default interface UseCase
  extends Entity,
    uid,
    I_UseCase,
    NRequired<ILabel>,
    CreatedBy {
  type: TypePermission;
  enable: boolean;
}
