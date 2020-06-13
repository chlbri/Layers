import SchemaClass from "../../../domain/contract/Pipe";
import E_User from "../../../domain/entities/user";

const S_User: SchemaClass<E_User> = {
  propParams: {
    createdAt: () => true,
    firstnames: () => true,
    mdp: () => true,
    lastname: () => true,
    deletedAt: () => true,
    login: () => true,
    uid: () => true
  },
  classParams: arg => true
};

export default S_User;
