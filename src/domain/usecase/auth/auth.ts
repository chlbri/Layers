import Human from "../../contract/Human";
import ReturnData from "../../contract/ReturnData";
import Validator from "../../contract/Validator";
import IUseCase from "../../contract/IUseCase";
import Mail from "../../entities/Mail";

const _signIn: IUseCase = {
  call(arg: Human) {
    throw new Error("Method not implemented.");
  },
} as const;

const _signUp: IUseCase = {
  call(arg: Human) {
    throw new Error("Method not implemented.");
  },
} as const;

const _reinitializeCredentials: IUseCase = {
  call(arg: Mail) {
    throw new Error("Method not implemented.");
  },
} as const;

const domain = {
  _signIn,
  _signUp,
  _reinitializeCredentials,
} as const;

export default domain;
