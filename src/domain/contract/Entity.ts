import { DataTypes } from "./utils";
import { Helper } from "./helper";
import uid from "./uid";

type Entity<T extends {} = {} > = {
  [P in keyof T]: DataTypes;
};

export default Entity;
