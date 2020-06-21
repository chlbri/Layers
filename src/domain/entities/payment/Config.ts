import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import { NullishNumber } from "../../../core/Nullish";

export default interface E_ConfigPayment extends Entity, _Id {
  limit?: NullishNumber;
}
