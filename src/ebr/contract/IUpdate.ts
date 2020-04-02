interface IUpdate<T extends object = object> {
  date?: Date;
  before?: Partial<T>;
  after?: Partial<T>;
}

export default IUpdate;
