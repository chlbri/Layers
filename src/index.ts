import IUpdate from "./ebr/contract/IUpdate";
import _Id from "./ebr/contract/_Id";
import Generator from "./ebr/contract/Validator";
import Schema from "./ebr/contract/types/schema";
import Valid_User1 from "./abr/validator/user";
import { MongoClient } from "mongodb";
import Repo_User from "./output/db/mongodb/repo/user";

const example = new Repo_User("Ani Charles-Lévi", "Bri", "chlbri", "123456789");

for (let index = 0; index < 100; index++) {
  (async () => console.log(await example.copy().q_create()))();
}

(async () =>
  console.log(
    await example.q_update({ $set: { lastname: "AAAAHH" } })
  ))();
(async () => console.log(await example.q_read()))();
