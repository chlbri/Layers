import uid from "../contract/uid";
import ITimestamps from "../contract/ITimestamps";
import Entity from "../contract/Entity";
import { Nullish } from "../../core/Types";
import IUpdates from "../contract/IUpdates";

type NullishString = Nullish<string>;

export default interface E_User
  extends Entity<E_User>,
    uid,
    ITimestamps, IUpdates {
  firstnames?: NullishString;
  lastname?: NullishString;
  login?: NullishString;
  mdp?: NullishString;
}
