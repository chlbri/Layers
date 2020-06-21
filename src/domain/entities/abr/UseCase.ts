import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import { NullishString } from "../../../core/Nullish";
import IUseCase from "../../contract/IUseCase";
import ILabel from "../../contract/ILabel";
import CreatedBy from "../../contract/CreatedBy";
import TypePermission from "../permission/type";
import { NRequired } from "../../../core/Types";

export default interface UseCase
  extends Entity,
    IUseCase,
    ILabel,
    CreatedBy {
  enable?: boolean;
}
