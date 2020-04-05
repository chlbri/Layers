import IUpdate from "./ebr/contract/IUpdate";
import _Id from "./ebr/contract/_Id";
import Generator from "./ia/gateway/contracts/Validator";
import Schema from "./ebr/contract/ISchema";
import R_User, { validator } from "./output/db/mongodb/repo/R_User";
import E_User, { E_UserC } from "./ebr/entity/E_User";
import { ObjectId, MongoClient } from "mongodb";
import V_User1 from "./ia/gateway/validator/V_User";

const arg = {
  firstnames: "Ani Charles-Levi",
  lastname: "BRI",
  login: "chlbri",
  mdp: "123456789"
};

// #region CRUD
// #region Create
(async () =>
  console.log("\n Creating \n", "From outside : ", await R_User.create(arg)))();
// #endregion
// #region Read
(async () =>
  console.log(
    "\n Reading \n",
    "From outside : ",
    await R_User.read({ lastname: "BRI" }, { useUnifiedTopology: true })
  ))();
// #endregion
// #region update
(async () =>
  console.log(
    "\n Updating \n",
    "From outside : ",
    await R_User.update(
      { login: "chlbri" },
      { login: "evidemment" },
      { useUnifiedTopology: true }
    )
  ))();
// #endregion
// #region Example delete
(async () =>
  console.log(
    "\n Deleting... \n",
    "From outside : ",
    await R_User.delete({ lastname: "BRI" }, { useUnifiedTopology: true })
  ))();
// #endregion
// #region Login
(async () =>
  console.log(
    "\n Log in \n",
    "From outside : ",
    await R_User.login({ login: "chlbri" }, { useUnifiedTopology: true })
  ))();
// #endregion
// #endregion

// let r = 4;
// // console.log(!r);
// console.log(V_User1.schema);
// console.log(validator.validate({ login: "trye" }));

const conStr = "mongodb://localhost:27017";
const DB_NAME = "testca";

const client = new MongoClient(conStr, { useUnifiedTopology: true });

const all = Array.from(Array<E_User>(2000), () => ({ ...arg }));

// #region InsertMany
// (async () => {
//   console.log("Starting bloc \n");

//   console.log();
//   const date1 = new Date();
//   const db = (await client.connect()).db("user");
//   console.log(
//     (await db.collection<E_User>("user").insertMany(all)).insertedIds
//   );
//   const date2 = new Date();
//   client.close();
//   const time = date2.valueOf() - date1.valueOf();
//   console.log("Average Time for completion : ", time);
// })();
// #endregion
// #region Delete
// (async () => {
//   console.log("Starting bloc \n");

//   console.log();
//   const date1 = new Date();
//   console.log(
//     await (await client.connect())
//       .db(DB_NAME)
//       .collection<E_User>("user")
//       .deleteMany({ createdAt: { $exists: false } })
//   );
//   const date2 = new Date();
//   client.close();
//   const time = date2.valueOf() - date1.valueOf();
//   console.log("Average Time for completion : ", time);
// })();
// #endregion

// console.log(response);
