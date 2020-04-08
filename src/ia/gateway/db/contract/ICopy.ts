export default interface ICopy<T> {
  copy(...args: any): T;
  compute(...args: any): void;
}
