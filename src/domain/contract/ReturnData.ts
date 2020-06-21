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
const Response300: BadResponse = {
  status: 300,
};
const Response404: BadResponse = {
  status: 404,
};
const Response204: GoodResponse = {
  status: 204,
  payload: undefined,
};

export default ReturnData;
export {
  GoodResponse,
  BadResponse,
  PromiseReturnData,
  Response300,
  Response404,
  Response500,
  Response204,
};
