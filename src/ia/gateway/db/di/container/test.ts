import { IRepo_Task } from "./../../repo/task";
import "reflect-metadata";
import { Container, inject, injectable } from "inversify";
import { IRepo_User } from "../../repo/user";
import { TYPES } from "../types";
import User_Mongo from "../../../../../output/db/mongodb/repo/user";
import Task_Mongo from "../../../../../output/db/mongodb/repo/task";

const MONGO_CONTAINER = new Container();

export interface TTT<T> {
  label: string;
  desc: string;
  age: number;
  bet: T;
}

@injectable()
export class Descendant implements TTT<number> {
  bet!: number;
  label!: string;
  desc!: string;
  /*  @inject("10") */ age!: number;
  aret() {}
}

// #region Configuration
MONGO_CONTAINER.bind<IRepo_User>(Symbol.for("IRepo_User")).to(User_Mongo);
MONGO_CONTAINER.bind<IRepo_Task>(Symbol.for("IRepo_Task"))
  .to(Task_Mongo)
  .onActivation((_, inject) => {
    inject.label = "";
    inject.desc = "";
    return inject;
  });
MONGO_CONTAINER.bind<TTT<any>>(Symbol.for("TTT")).to(Descendant);
// #endregion

export { MONGO_CONTAINER };
