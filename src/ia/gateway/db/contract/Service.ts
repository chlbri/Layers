import { IRepo_Task } from "./../repo/task";
import { Container, inject } from "inversify";
import IRepo from "./IRepo";
import { TYPES } from "../di/types";
import { IRepo_User } from "../repo/user";
class Service {
  
  @inject(TYPES.IRepo_Task)
  task!: IRepo_Task;
  @inject(TYPES.IRepo_User)
  user!: IRepo_User;
}

export { Service };
