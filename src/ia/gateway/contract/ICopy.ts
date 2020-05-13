import E_User from "../../../ebr/entity/user";

export default interface ICopy<T> {
  copy(...args: any): T;
  compute(...args: any): void;
}

function Tuplify<T extends any[]>(...args: T) {
  return args;
}

interface Person {
  name: string;
  age: number;
}




