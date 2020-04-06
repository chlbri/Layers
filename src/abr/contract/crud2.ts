import { CreateOne, ReadOne, UpdateOne, DeleteOne } from "./types/queries";
import Validator from "../../ebr/contract/Validator";

export default abstract class CRUD<T>{
  abstract validator: Validator<T>
  abstract create: CreateOne<T, never>;
  abstract read: ReadOne<T, never>;
  abstract update: UpdateOne<T, never>;
  abstract delete: DeleteOne<T, never>;
}