type Projection<T, K extends keyof T = keyof T> = {
  [P in K | "_id"]-?: boolean;
};
