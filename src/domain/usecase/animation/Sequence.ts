import I_UseCase from "../../contract/IUseCase";
import ReturnData from "../../contract/ReturnData";
import IDataUseCase from "../../contract/IDataUseCase";
import Validator from "../../contract/Validator";
import IUseCase from "../../contract/IUseCase";
import CopyWith from "../../contract/CopyWith";
import Sequence from "../../entities/animation/Sequence";
import Animation from "../../entities/animation/Animation";
import { isEmpty } from "lodash";

const _animate: IUseCase = {
  call() {
    throw new Error("Method not implemented.");
  },
} as const;

const Repo = "";

const _create: IUseCase = {
  call(sequence: Sequence) {
    const out: Sequence = {
      _id: "",
      ...sequence,
    };
    return out;
  },
} as const;

const _read: IUseCase = {
  call(sealed: Sequence, change: Partial<Sequence>) {
    return CopyWith(sealed, change);
  },
} as const;

const _getDuration: IUseCase = {
  call(sequence: Sequence) {
    const anims = sequence.anims;
    if (!anims || isEmpty(anims)) {
      return 0;
    } else {
      const { duration, start } = anims.sort(
        (b, a) => a.start + a.duration - (b.start + b.duration)
      )[0];
      return duration + start;
    }
  },
} as const;

const _addAnim: IUseCase = {
  call(
    sequence: Sequence,
    ...anims: (Animation & { start: number })[]
  ) {
    const out = { ...sequence };
    out.anims?.push(...anims);
    return out;
  },
} as const;

const _update: IUseCase = {
  call(sealed: Sequence, change: Sequence) {
    return CopyWith(sealed, change);
  },
} as const;

const _delete: IUseCase = {
  call(sealed: Sequence, change: Sequence) {
    return CopyWith(sealed, change);
  },
} as const;

const domain = {
  _create,
  _read,
  _update,
  _delete,
  _animate,
  _addAnim,
  _getDuration,
} as const;

export default domain;
