import { Condition } from "./Types";

type ISchema<T> = {
  [P in keyof T]-?: Condition<T[P]>;
};

interface Lol {
  name: string;
  id: number;
}

type Test<T> = T extends { [P in keyof T]: infer U } ? U : never;

type v = Test<Lol>;

type Schema<T> = {
  propParams: ISchema<T>;
  classParams?: (Condition<T>);
};

export default Schema;

type IntersectionOfValues<T> = T extends { [P in keyof T]: infer I }
  ? I
  : never;

type IntersectionOfFunctionsToType<F> = F extends {
  (a: infer A): void;
}
  ? [A]
  : F extends {
      (a: infer A): void;
      (b: infer B): void;
    }
  ? [A, B]
  : F extends {
      (a: infer A): void;
      (b: infer B): void;
      (c: infer C): void;
    }
  ? [A, B, C]
  : never;

type ToTuple<T> = IntersectionOfFunctionsToType<
  IntersectionOfValues<{ [K in keyof T]: (v: T[K]) => void }>
>;



interface Person {
  name: string;
  ame: number;
}

type Args = ToTuple<Person>; // ['name', string, 'age', number]

interface IAttribute<Key, Value> {
  key: Key;
  value: Value;
  approved?: boolean;
  published?: boolean;
  fromPrototype?: boolean;
}



type IObject<T> = Array<T extends { [P in keyof T]: infer U } ? U : never>; // K extends keyof T. How can I fix it?


interface ICustomAttributes {
  attr1: boolean;
  attr2: number;
}

type ICustom = IObject<ICustomAttributes>;

const o :ICustom = [1]
