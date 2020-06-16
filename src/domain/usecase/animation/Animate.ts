import I_UseCase from "../../contract/I_UseCase";
import ReturnData from "../../contract/ReturnData";
import IData_UseCase from "../../contract/I_DataUseCase";
import Validator from "../../contract/Validator";

class Animate<T extends IAnimation> extends IData_UseCase<T> {

  call(arg: T): ReturnData<T> {
    throw new Error("Method not implemented.");
  }
  
}
