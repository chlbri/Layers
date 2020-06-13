import DataProperties from "../../domain/contract/Entity";
import I_UseCase, { UseCaseFunction } from "../../domain/contract/I_UseCase";
import ReturnData from "../../domain/contract/ReturnData";
import Dispatcher from "../../ia/gateway/contract/Dispatcher";
import useCase from "./useCase";

type Domain = {
  [P: string]: I_UseCase<any>;
};

class Use extends I_UseCase<{ uid: string }> {
  call(arg: { uid: string }): ReturnData<{ uid: string }> {
    return Promise.resolve({
      status: 300,
      payload: "Dodo",
    });
  }
}
class Use2 extends I_UseCase<{ uid: string }> {
  call(arg: { uid: string }): ReturnData<{ uid: string }> {
    const uid = arg.uid;
    return Promise.resolve({
      status: 200,
      payload: {
        uid,
      },
    });
  }
}

const c = {
  erzr: new Use(),
  erre: new Use2(),
};

const setter = useCase(c, "erre");

(async () =>
  console.log(
    await setter({ uid: "5" }).then((val) => val.payload)
  ))();

export default Domain;
