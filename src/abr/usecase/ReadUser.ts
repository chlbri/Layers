import AUseCase from "../contract/AUseCase";
import E_User from "../../ebr/entity/E_User";
import AR_User from "../repo/AR_User";

export default class extends AUseCase<[AR_User], E_User> {
  get exec() {
    return this.args[0].readOne();
  }
}
