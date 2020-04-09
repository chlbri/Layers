import U from "./IUpdate";

export default interface ITimestamps<T extends object> {
  createdAt?: Date;
  updates?: U<T>[] | U<T>;
  deletedAt?: Date|null;
}
