import E_User from "../../../ebr/entity/user";
import {
  CreateOne,
  ReadOne,
  UpdateOne,
  DeleteOne,
  BulkOne
} from "../contracts/Types";
import { NAME, ALL } from "../../../ebr/helpers/user";

type CreateOneUser<T extends ALL> = CreateOne<E_User, T>;
type ReadOneUser = ReadOne<E_User, NAME>;
type UpdateOneUser<T extends ALL> = UpdateOne<E_User, T>;
type DeleteOneUser<T extends ALL> = DeleteOne<E_User, T>;
type BulkUser<T extends ALL> = BulkOne<E_User, T>;

// type AllUserQueries<T extends ALL> =
//   | CreateOneUser<T>
//   | ReadOneUser
//   | UpdateOneUser<T>
//   | DeleteOneUser<T>
//   | BulkUser<T>;

export {
  CreateOneUser,
  ReadOneUser,
  UpdateOneUser,
  DeleteOneUser,
  BulkUser /* ,
  AllUserQueries */
};
