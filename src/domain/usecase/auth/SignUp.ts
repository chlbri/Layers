import IData_UseCase from "../../contract/IDataUseCase";
import ReturnData from "../../contract/ReturnData";
import Validator from "../../contract/Validator";
import Human from "../../contract/Human";

class SignUp implements IData_UseCase<Human>{
  call(arg: Human): ReturnData<Human> {
    throw new Error("Method not implemented.");
  }
  validator!: Validator<Human>;

}