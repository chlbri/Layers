import Delete from "./Delete";
import Create from "./Create";
import Read from "./Read";
import Update from "./Update";

export default interface CRUD<T> extends Create, Read<T>, Update, Delete {}
