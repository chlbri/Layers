import DataProperties from "./Entity";

type Avoid = "updates" | "createdAt" | "deletedAt";

interface IUpdate<T = any> {
  date?: Date | null;
  before?: Partial<Omit<T, Avoid>> | null;
  after?: Partial<Omit<T, Avoid>> | null;
}

export default interface IUpdates<T extends DataProperties = DataProperties> {
  updates?: IUpdate<T>[] | null;
}
