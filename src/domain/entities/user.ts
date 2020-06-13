import uid from "../contract/uid";
import ITimestamps from "../contract/ITimestamps";
import Entity from "../contract/Entity";

export default interface E_User extends Entity<E_User>, uid, ITimestamps {
  firstnames?: string;
  lastname?: string;
  login?: string;
  mdp?: string;
}




