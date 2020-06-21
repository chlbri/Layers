import IUseCase from "../../contract/IUseCase";
import UseCase from "../../entities/abr/UseCase";
import CopyWith from "../../contract/CopyWith";
import Domain from "../../contract/Domain";
import E_User from "../../Entities/User";

const Repo = "";

const _create: IUseCase = {
  call(use: UseCase) {
    const out: UseCase = {
      //TODO: Use uuid.v4()
      _id: "",
      ...use,
    };
    return out;
  },
};

const _read: IUseCase = {
  call(sealed: UseCase, change: Partial<UseCase>) {
    return CopyWith(sealed, change);
  },
};

const _update: IUseCase = {
  call(sealed: UseCase, change: UseCase) {
    return CopyWith(sealed, change);
  },
};

const _delete: IUseCase = {
  call(sealed: UseCase, change: UseCase) {
    return CopyWith(sealed, change);
  },
};

const _assign: IUseCase = {
  call(use: UseCase, user: E_User) {},
};

const domain = {
  _create,
  _read,
  _update,
  _delete,
  _assign,
} as const;

export default domain;
