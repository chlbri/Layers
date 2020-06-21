import I_UseCase from "../../contract/IUseCase";
import ReturnData from "../../contract/ReturnData";
import IDataUseCase from "../../contract/IDataUseCase";
import Validator from "../../contract/Validator";
import IUseCase from "../../contract/IUseCase";
import CopyWith from "../../contract/CopyWith";
import Sequence from "../../entities/animation/Sequence";
import Animation from "../../entities/animation/Animation";
import { isEmpty } from "lodash";
import useCase from "../../contract/useCase";

const _animate = {
  call() {
    throw new Error("Method not implemented.");
  },
} ;

const Repo = "";

const _create = {
  call(sequence: Sequence) {
    const out: Sequence = {
      _id: "",
      ...sequence,
    };
    return out;
  },
} ;

const _read = {
  call(sealed: Sequence, change: Partial<Sequence>) {
    return CopyWith(sealed, change);
  },
} ;

const _getDuration = {
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
} ;

const _addAnim = {
  call(
    sequence: Sequence,
    ...anims: (Animation & { start: number })[]
  ) {
    const out = { ...sequence };
    out.anims?.push(...anims);
    return out;
  },
} ;

const _update = {
  call(sealed: Sequence, change: Sequence) {
    return CopyWith(sealed, change);
  },
} ;

const _delete = {
  call(sealed: Sequence, change: Sequence) {
    return CopyWith(sealed, change);
  },
} ;

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
