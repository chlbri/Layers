export default interface ICopy<T> {
  map: T;
  copy(map: T): object;
}
