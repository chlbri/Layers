import E_User from "../Entities/User";
import ReturnData from "./ReturnData";
import { DataTypes } from "./Datatypes";
import Entity from "./Entity";

// type Case<T> = {
//   [P in Exclude<keyof T, "call">]: IRepo;
// };
export type UseCaseFunction<T extends Entity> = (
  arg: T
) => ReturnData<T>;

export default interface IUseCase {
  call(...args: any[]): any;
}
