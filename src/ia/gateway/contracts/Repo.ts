import { EntityQuery, CreateOne, ReadOne, UpdateOne, DeleteOne } from "./Types";
import Validator from "./Validator";

export default abstract class IRepoEntity<T> {
  [r: string]: EntityQuery<T, never> | Validator<T> | Validator<T>[];
  constructor(
    public readonly validator: Validator<T>,
    ...args: Validator<T>[]
  ) {}
  abstract create: CreateOne<T, never>;
  abstract read: ReadOne<T, never>;
  abstract update: UpdateOne<T, never>;
  abstract delete: DeleteOne<T, never>;
}
