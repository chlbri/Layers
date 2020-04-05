import _Id from "../contract/_Id";
import ITimestamps from "../contract/ITimestamps";
import Entity from "../contract/Entity";
import IUpdate from "../contract/IUpdate";

export default interface E_User extends Entity, _Id, ITimestamps<E_User> {
  firstnames?: string[] | string;
  lastname?: string;
  login?: string;
  mdp?: string;
}

export class E_UserC implements E_User {
  constructor(
    public firstnames?: string[] | string,
    public lastname?: string,
    public login?: string,
    public mdp?: string,
    public createdAt?: Date,
    public updates?: IUpdate<E_User>[] | IUpdate<E_User>,
    public deletedAt?: Date
  ) {}
}
