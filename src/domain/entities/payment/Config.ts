import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import { NullishNumber } from "../../../core/Nullish";

export default interface ConfigPayment extends Entity, _Id {
  limit?: NullishNumber;
}
