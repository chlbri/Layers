import U from "./IUpdates";
import { Nullish } from "../../core/Types";

type NullishDate = Nullish<Date>;

export default interface ITimestamps {
  createdAt?: NullishDate;
  deletedAt?: NullishDate;
}
