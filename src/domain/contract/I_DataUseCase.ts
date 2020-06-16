import E_User from "../Entities/User";
import ReturnData from "./ReturnData";
import { DataTypes } from "./Data";
import Entity from "./Entity";
import Validator from "./Validator";
import I_UseCase from "./I_UseCase";
import uid from "./uid";
import { Nullish } from "../../core/Nullish";
import NFunction from "./NFunction";

// type Case<T> = {
//   [P in Exclude<keyof T, "call">]: IRepo;
// };

export default interface IData_UseCase<E extends Entity & uid>
  extends I_UseCase {
  call: NFunction;
  validator?: Nullish<Validator<E>>;
}

// const c = new Use(new Map([["hjhjlhj", {}]]));
// c.call({}).then((val) => val.payload);
