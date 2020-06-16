import Human from "../../contract/Human";
import ReturnData from "../../contract/ReturnData";
import Validator from "../../contract/Validator";
import I_UseCase from "../../contract/I_UseCase";

export default class signIn implements I_UseCase{
  call(arg: Human): ReturnData<Human> {
    throw new Error("Method not implemented.");
  }
  validator!: Validator<Human>;

}