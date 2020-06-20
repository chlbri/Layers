import IDataUseCase from "../../contract/IDataUseCase";
import PlatformPayment from "../../entities/payment/Platform";
import ReturnData from "../../contract/ReturnData";
import { Without } from "../../../core/Types";

export default class AssignPlatformPayment implements IDataUseCase<PlatformPayment> {
  call(
    arg: PlatformPayment
  ): ReturnData<Without<PlatformPayment, "credentials">> {
    throw new Error("Method not implemented.");
  }
}
