import ReturnData from "../../contract/ReturnData";
import IDataUseCase from "../../contract/IDataUseCase";
import Validator from "../../contract/Validator";
import Animation from "../../entities/animation/Animation";
import IUseCase from "../../contract/IUseCase";
import UseCase from "../../Entities/abr/UseCase";
import CopyWith from "../../contract/CopyWith";
import E_User from "../../Entities/User";

const _animate = {
  call() {
    throw new Error("Method not implemented.");
  },
};

const Repo = "";

const _create = {
  call(use: Animation) {
    const out: Animation = {
      //TODO: Use uuid.v4()
      _id: "",
      ...use,
    };
    return out;
  },
};

const _read = {
  call(sealed: Animation, change: Partial<Animation>) {
    return CopyWith(sealed, change);
  },
};

const _update = {
  call(sealed: Animation, change: Animation) {
    return CopyWith(sealed, change);
  },
};

const _delete = {
  call(sealed: Animation, change: Animation) {
    return CopyWith(sealed, change);
  },
};


const domain = {
  _create,
  _read,
  _update,
  _delete,
  _animate,
} as const;

export default domain;
