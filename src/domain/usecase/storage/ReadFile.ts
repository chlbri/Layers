import I_UseCase from "../../contract/IUseCase";
import fs from "fs";

export default class ReadFile implements I_UseCase {
  constructor(params: any) {}
  
  call(...args: any[]) {
    throw new Error("Method not implemented.");
  }
}
