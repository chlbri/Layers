import _Id from "../contract/_Id";
import ITimestamps from "../contract/ITimestamps";
import Entity from "../contract/Entity";

export default interface E_User extends Entity, _Id, ITimestamps<E_User> {
  firstnames?: string[] | string;
  lastname?: string;
  name: () => string;
  login?: string;
}
