import E_User from "../Entities/User";
import ReturnData from "./ReturnData";
import { DataTypes } from "./Datatypes";
import Entity from "./Entity";
import NFunction from "./NFunction";

export default interface IUseCase {
  call: NFunction;
}
