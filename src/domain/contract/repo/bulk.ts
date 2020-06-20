import Entity from "../Entity";
import { BulkQuery as BQ, Query as Q } from "../Query";
import _Id from "../_Id";

export default interface Bulk<E extends Entity> {
  // bulk: any;
  bulkCreate: BQ<[...Partial<E>[]], void>;
  bulkUpdate: BQ<[...[Partial<E>, Partial<E>][]], void>;
  bulkDelete: BQ<[...Partial<E>[]], void>;
  execute: Q<[any], number>;
}
