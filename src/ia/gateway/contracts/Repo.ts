import { EntityQuery } from "./Types";
import Validator from "./Validator";

export default abstract class IRepoEntity<T> {
  [r: string]: EntityQuery<T, never> | Validator<T> | Validator<T>[];
}
