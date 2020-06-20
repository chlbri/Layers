import { FetchStatus } from "./Fetch";
import E_User from "../Entities/User";
import { DataTypes } from "./Datatypes";
import Entity from "./Entity";

type NExtract<T, U extends T> = T extends U ? T : never;
type NExclude<T, U extends T> = T extends U ? never : T;

type GoodResponse<T = undefined> = {
  status: NExtract<FetchStatus, 200 | 204>;
  payload: T;
};

type BadResponse<T = undefined> = {
  status: NExclude<FetchStatus, 200 | 204>;
  payload?: T;
};

type ReturnData<
  Good = undefined,
  Bad extends DataTypes = undefined
> = GoodResponse<Good> | BadResponse<Bad>;

type PromiseReturnData<
  Good = undefined,
  Bad extends DataTypes = undefined
> = Promise<ReturnData<Good, Bad>>;

const Response500: BadResponse = {
  status: 500,
};
const response300: BadResponse = {
  status: 300,
};
const response404: BadResponse = {
  status: 404,
};

export default ReturnData;
export {
  GoodResponse,
  BadResponse,
  PromiseReturnData,
  response300,
  response404,
  Response500,
};
