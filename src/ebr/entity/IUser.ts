import _Id from "../contract/_Id";
import ITimestamps from "../contract/ITimestamps";

export default interface IUser extends _Id, ITimestamps<IUser> {
  firstnames?: string[] | string;
  lastname?: string;
  name: () => string;
  login?: string;
}
