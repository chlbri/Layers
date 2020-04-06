import { OptionalId } from "mongodb";
import _Id from "../_Id";

type PropTypes<T extends object> = T extends {
  [rt in keyof T]: infer U;
}
  ? U
  : false;

export { PropTypes };
