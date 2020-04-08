import { TYPES } from "./ia/gateway/db/di/types";
import { IRepo_Task } from "./ia/gateway/db/repo/task";
import IUpdate from "./ebr/contract/IUpdate";
import _Id from "./ebr/contract/_Id";
import Generator from "./ebr/contract/Validator";
import Schema from "./ebr/contract/types/schema";
import Valid_User1 from "./abr/validator/user";
import { MongoClient } from "mongodb";
import User_Mongo from "./output/db/mongodb/repo/user";
import Task_Mongo from "./output/db/mongodb/repo/task";
import { MONGO_CONTAINER, TTT } from "./ia/gateway/db/di/container/test";
import E_Task from "./ebr/entity/task";
import DB_CONTAINER from "./ia/gateway/db/di/container/output";

const example = new User_Mongo(
  "Ani Charles-Lévi",
  "Bri",
  "chlbri",
  "123456789"
);



const example2 = DB_CONTAINER.get<IRepo_Task>(Symbol.for("IRepo_Task"));
example2.label = "Etudier";
example2.desc = "Parce que c'est important dans la vie";
console.log(example2);
// example2.createdAt = new Date();


// const example2 = new Task_Mongo(
//   "Etudier",
//   "Parce que c'est important dans la vie",
//   new Date()
// );

// for (let index = 0; index < 100; index++) {
//   (async () => console.log(await example.copy().q_create()))();
// }

// (async () =>
//   console.log(
//     await example.q_update({ $set: { lastname: "AAAAHH" } })
//   ))();
// (async () => console.log(await example.q_read()))();

for (let index = 0; index < 100; index++) {
  (async () => console.log(await example2.copy().q_create()))();
}

(async () =>
  console.log(await example2.q_update({ $set: { desc: "AAAAHH" } })))();
(async () => console.log(await example2.q_read()))();
