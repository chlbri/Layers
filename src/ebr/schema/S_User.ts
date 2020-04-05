import Schema from "../contract/ISchema";
import E_User from "../entity/user";

const S_User: Schema<E_User> = {
  propParams: {
    createdAt: d => true,
    updates: d => true,
    firstnames: d => true,
    mdp: d => true,
    lastname: d => true,
    deletedAt: d => true,
    login: d => true,
    _id: d => true
  },
  classParams: arg => true
};

export default S_User;
