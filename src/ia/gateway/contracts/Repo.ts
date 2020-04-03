import { Query, EntityQuery } from "./Types";
import Entity from "../../../ebr/contract/Entity";
import Validator from "./Validator";

export default abstract class IRepoEntity<T> {
  [r: string]: EntityQuery<T, never> | Validator<T> | Validator<T>[];
}
