import CRUD from "./crud";
import Bulk from "./bulk";

export default interface IRepo<E> extends CRUD<E>, Bulk<E> {}
