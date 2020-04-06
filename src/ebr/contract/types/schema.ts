
type Condition<T = any> = (arg: T) => boolean;

type ISchema<T> = {
  [P in keyof T]-?: Condition<T[P]>;
};

type Schema<T> = {
  propParams: ISchema<Partial<T>>;
  classParams?: (Condition<Partial<T>>);
};

export default Schema;