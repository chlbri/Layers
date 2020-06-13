import Entity from "./Entity";
import { Nullish } from "../../core/Types";

type Avoid = "updates" | "createdAt" | "deletedAt";

interface IUpdate<T extends Entity = Entity> {
  date?: Nullish<Date>;
  before?: Nullish<Partial<Omit<T, Avoid>>>;
  after?: Nullish<Partial<Omit<T, Avoid>>>;
}

export default interface IUpdates<
  T extends Entity = Entity
> {
  updates?: IUpdate<T>[] | null;
}
