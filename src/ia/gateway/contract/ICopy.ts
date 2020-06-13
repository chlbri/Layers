import E_User from "../../../domain/entities/user";
import { UnionToTuple } from "../../../core/Tuplify";

export default interface ICopy<T> {
  copy(args: T): T;
  compute(args: T): void;
}

const c: ICopy<E_User> = {
  compute(t) {},
  copy(last) {
    return {};
  },
};
