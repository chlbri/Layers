import { FetchStatus } from "./Fetch";
import E_User from "../entities/user";
import { DataTypes } from "./utils";
import { Nullish } from "../../core/Types";
import DataProperties from "./Entity";

type Extract<T, U extends T> = T extends U ? T : never;
type Exclude<T, U extends T> = T extends U ? never : T;

type GoodResponse<T> = {
  status: Extract<FetchStatus, 200 | 204>;
  payload: T;
};
type BadResponse = {
  status: Exclude<FetchStatus, 200 | 204>;
  payload?:DataTypes
};

type ReturnData<
  T extends DataTypes | DataProperties = DataTypes,
> = Promise<GoodResponse<T> | BadResponse>;

export default ReturnData;
