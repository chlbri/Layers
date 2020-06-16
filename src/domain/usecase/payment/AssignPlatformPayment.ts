import IData_UseCase from "../../contract/I_DataUseCase";
import PlatformPayment from "../../entities/payment/Platform";
import ReturnData from "../../contract/ReturnData";
import { Without } from "../../../core/Types";

export default class AssignPlatformPayment extends IData_UseCase<PlatformPayment> {
  call(
    arg: PlatformPayment
  ): ReturnData<Without<PlatformPayment, "credentials">> {
    throw new Error("Method not implemented.");
  }
}
