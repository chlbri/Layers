import Entity from "../../contract/Entity";
import uid from "../../contract/uid";
import { NullishNumber } from "../../../core/Nullish";

export default interface ConfigPayment extends Entity, uid {
  limit?: NullishNumber;
}
