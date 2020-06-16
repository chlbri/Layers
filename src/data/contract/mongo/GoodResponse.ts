import { CopyWith } from "./../../../domain/contract/CopyWith";
import { GoodResponse as G } from "../../../domain/contract/ReturnData";

export default class GoodResponse<T> implements G<T> {
  status: 200 | 204;
  payload: T;
  constructor(arg: G<T>) {
    this.status = arg.status;
    this.payload = arg.payload;
  }
  copyWith(arg: G<T>) {
    return CopyWith(this, arg);
  }
}
