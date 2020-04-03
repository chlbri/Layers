import E_User from "../../../ebr/entity/E_User";
import {
  CreateOne,
  ReadOne,
  UpdateOne,
  DeleteOne,
  Bulk
} from "../contracts/Types";
import { NAME, ALL } from "../query_schema/QS_User";
import V_User from "../validator/V_User";

type CreateOneUser<T extends ALL> = CreateOne<E_User, T>;
type ReadOneUser = ReadOne<E_User, NAME>;
type UpdateOneUser<T extends ALL> = UpdateOne<E_User, T>;
type DeleteOneUser<T extends ALL> = DeleteOne<E_User, T>;
type BulkUser<T extends ALL> = Bulk<E_User, T>;

const C: ReadOneUser = async arg => {
  if (V_User.validate(arg)) return await { firstnames: "", lastname: "" };
};

export { CreateOneUser, ReadOneUser, UpdateOneUser, DeleteOneUser, BulkUser };
