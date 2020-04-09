import { IRepo_User } from "./ia/gateway/db/repo/user";
import { TYPES } from "./ia/gateway/db/di/types";
import { IRepo_Task } from "./ia/gateway/db/repo/task";

import DB_CONTAINER from "./ia/gateway/db/di/dispatcher";
import User_Mongo from "./output/db/mongodb/repo/user";

const example = DB_CONTAINER.get<IRepo_User>(TYPES.IRepo_User);
example.compute("Ani Charles-Lévi", "Bri", "chlbri", "1943");

const example2 = DB_CONTAINER.get<IRepo_Task>(TYPES.IRepo_Task);
example2.label = "Etudier";
example2.desc = "Parce que c'est important dans la vie";

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
(async () =>
  console.log(await example.q_delete( )))();
(async () => console.log(await example2.q_read()))();
(async () => console.log(await example.q_login()))();
(async () => console.log(await User_Mongo.search_deleted()))();
