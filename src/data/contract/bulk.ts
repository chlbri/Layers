import { DataTypes } from "../../domain/contract/Data";
import Entity from "../../domain/contract/Entity";
import { Nullish } from "../../core/Nullish";
import IFunction from "../../domain/contract/IFunction";
import { BulkQuery } from "../../domain/contract/Query";

type NBQP<E extends (DataTypes | Entity)[]> = Nullish<BulkQuery<E>>;

export default interface Bulk<E extends Entity> {
  bulkCreate: NBQP<[any, Partial<E>]>;
  queryRead: NBQP<[any, Partial<E>]>;
  bulkUpdate: NBQP<[any, Partial<E>, Partial<E>]>;
  bulkDelete: NBQP<[any, string]>;
}
