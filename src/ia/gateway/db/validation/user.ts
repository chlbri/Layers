import SchemaClass from "../../../../domain/contract/Pipe";
import E_User from "../../../../domain/entities/user";

const S_User: SchemaClass<E_User> = {
  propParams: {
    createdAt: d => true,
    firstnames: d => true,
    mdp: d => true,
    lastname: d => true,
    deletedAt: d => true,
    login: d => true,
    uid: d => true
  },
  classParams: arg => true
};



export default S_User;
