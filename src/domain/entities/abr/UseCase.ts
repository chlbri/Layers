import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import { NullishString } from "../../../core/Nullish";
import I_UseCase from "../../contract/IUseCase";
import ILabel from "../../contract/ILabel";
import CreatedBy from "../../contract/CreatedBy";
import TypePermission from "../permission/type";
import { NRequired } from "../../../core/Types";

export default interface UseCase
  extends Entity,
    _Id,
    I_UseCase,
    NRequired<ILabel>,
    CreatedBy {
  type: TypePermission;
  enable: boolean;
}
