import U from "./IUpdates";
import { Nullish } from "../../core/Nullish";

type NullishDate = Nullish<Date>;

export default interface ITimestamps {
  createdAt?: NullishDate;
  deletedAt?: NullishDate;
}
