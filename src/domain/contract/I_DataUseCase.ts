import IRepo from "./IRepo";
import E_User from "../entities/user";
import ReturnData from "./Return";
import { DataTypes } from "./utils";
import Entity from "./Entity";
import Validator from "./Validator";
import I_UseCase from "./I_UseCase";
import uid from "./uid";

// type Case<T> = {
//   [P in Exclude<keyof T, "call">]: IRepo;
// };

export default abstract class IData_UseCase<
  E extends Entity & uid
> extends I_UseCase<E> {
  abstract call(arg: E): ReturnData<E>;
  abstract validator: Validator<E>;
}

// const c = new Use(new Map([["hjhjlhj", {}]]));
// c.call({}).then((val) => val.payload);
