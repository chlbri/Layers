export default interface Read<T> {
  readOne: (...args: any) => T;
  readMany: (...args: any) => T[];
}
