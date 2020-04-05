import IUpdate from "./ebr/contract/IUpdate";
import _Id from "./ebr/contract/_Id";
import Generator from "./ia/gateway/contracts/Validator";
import Schema from "./ebr/contract/ISchema";
import R_User from "./output/db/mongodb/repo/user";
import E_User, { E_UserC } from "./ebr/entity/user";
import Valid_User1 from "./ia/gateway/validator/user";
import { MongoClient } from "mongodb";

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

// #region InsertMany
const COUNT = 2000;
const conStr = "mongodb://localhost:27017";
const DB_NAME = "testca";
const client = new MongoClient(conStr, { useUnifiedTopology: true });
const all = Array.from(Array<E_User>(COUNT), () => ({ ...arg }));
// #endregion

