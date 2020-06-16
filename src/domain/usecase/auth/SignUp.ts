import IData_UseCase from "../../contract/I_DataUseCase";
import Human from "../../contract/Human";
import ReturnData from "../../contract/ReturnData";
import Validator from "../../contract/Validator";

class SignUp extends IData_UseCase<Human>{
  call(arg: Human): ReturnData<Human> {
    throw new Error("Method not implemented.");
  }
  validator!: Validator<Human>;

}