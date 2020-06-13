import IRepo from "./IRepo";
import E_User from "../entities/user";
import ReturnData from "./ReturnData";
import { DataTypes } from "./utils";
import Entity from "./Entity";

// type Case<T> = {
//   [P in Exclude<keyof T, "call">]: IRepo;
// };
export type UseCaseFunction<T> = (arg: T) => ReturnData<T>;

export default abstract class I_UseCase<
  E extends Entity
> {
  abstract call(arg: E): ReturnData<E>;
}
