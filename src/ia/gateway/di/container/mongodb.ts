import { IRepo_Task } from "../../repo/task";
import { Container } from "inversify";
import { IRepo_User } from "../../repo/user";
import { TYPES } from "../types";
import User_Mongo from "../../../../output/db/mongodb/repo/user";
import Task_Mongo from "../../../../output/db/mongodb/repo/task";

const MONGODB_CONTAINER = new Container();

// #region Configuration
MONGODB_CONTAINER.bind<IRepo_User>(TYPES.IRepo_User).to(User_Mongo);
MONGODB_CONTAINER.bind<IRepo_Task>(TYPES.IRepo_Task).to(Task_Mongo);
// #endregion

export default MONGODB_CONTAINER;
