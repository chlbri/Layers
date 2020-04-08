import { IRepo_User } from "./ia/gateway/db/repo/user";
import { TYPES } from "./ia/gateway/db/di/types";
import { IRepo_Task } from "./ia/gateway/db/repo/task";

import DB_CONTAINER from "./ia/gateway/db/di/dispatcher";

const example = DB_CONTAINER.get<IRepo_User>(TYPES.IRepo_User);
example.compute("Ani Charles-Lévi", "Bri", "chlbri", "123456789");

const example2 = DB_CONTAINER.get<IRepo_Task>(TYPES.IRepo_Task);
example2.label = "Etudier";
example2.desc = "Parce que c'est important dans la vie";
// console.log(example2);

// const example2 = new Task_Mongo(
//   "Etudier",
//   "Parce que c'est important dans la vie",
//   new Date()
// );

for (let index = 0; index < 20; index++) {
  (async () => console.log(await example.copy().q_create()))();
}

(async () =>
  console.log(
    await example.q_update({ $set: { lastname: "AAAAHH" } })
  ))();
(async () => console.log(await example.q_read()))();

for (let index = 0; index < 20; index++) {
  (async () => console.log(await example2.copy().q_create()))();
}

(async () =>
  console.log(await example2.q_update({ $set: { desc: "AAAAHH" } })))();
// (async () =>
//   console.log(await example2.q_delete({ desc: "AAAAHH" } )))();
// (async () => console.log(await example2.q_read()))();
// (async () => console.log(await example.q_read()))();
