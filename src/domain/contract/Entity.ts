import { DataTypes } from "./utils";

type Entity<T extends {} = {} > = {
  [P in keyof T]: DataTypes;
};

export default Entity;
