import I_UseCase from "../../contract/I_UseCase";
import E_User from "../../Entities/User";

type Options = {
  ext?: string;
  screen?: string;
};

export default class FetchFiles implements I_UseCase {
  call(user: E_User, options: Options) {
    throw new Error("Method not implemented.");
  }
}
