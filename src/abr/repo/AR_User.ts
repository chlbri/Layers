import ARepo from "../contract/ARepo";
import CRUD from "../contract/crud/CRUD";
import E_User from "../../ebr/entity/E_User";

export default abstract class AR_User extends ARepo implements CRUD<E_User> {
  abstract createOne(...args: any): any;
  abstract createMany(...args: any): any;
  abstract readOne(...args: any): E_User;
  abstract readMany(...args: any): E_User[];
  abstract updateMany(...args: any): any;
  abstract updateOne(...args: any): any;
  abstract deleteMany(...args: any): any;
  abstract deleteOne(...args: any): any;
}
