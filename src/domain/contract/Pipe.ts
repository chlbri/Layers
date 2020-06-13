type Pipe<I = any, O = any> = (arg: I) => O;

type Condition<T = any> = Pipe<T, boolean>;

type SchemaProperty<T> = {
  [P in keyof T]?: Condition<T[P]>;
};

type SchemaClass<T> = {
  propParams?: SchemaProperty<Partial<T>>;
  classParams?: Condition<Partial<T>>;
};

export default SchemaClass;
export { Pipe, Condition, SchemaProperty };
