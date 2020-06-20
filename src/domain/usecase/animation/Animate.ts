import I_UseCase from "../../contract/IUseCase";
import ReturnData from "../../contract/ReturnData";
import IData_UseCase from "../../contract/IDataUseCase";
import Validator from "../../contract/Validator";
import Animation from "../../entities/animation/Animation";

class Animate<T extends Animation> implements IData_UseCase<T> {

  call(arg: T): ReturnData<T> {
    throw new Error("Method not implemented.");
  }
  
}
