import { Pipe } from "./Piped";
import NFunction from "./NFunction";

type Condition<T = any> = (arg: T) => boolean;

type SchemaProperty<T> = {
  [P in keyof T]?: Condition<T[P]>;
};

type Schema<T> = {
  propParams?: SchemaProperty<Partial<T>>;
  classParams?: Condition<Partial<T>>;
};

export default Schema;
export { Condition, SchemaProperty };
