import V_User from "../../../../ia/gateway/validator/V_User";
import Source from "../Source";
import E_User from "../../../../ebr/entity/E_User";
import {
  Collection,
  CollectionBulkWriteOptions,
  CollectionInsertManyOptions,
  CollectionInsertOneOptions,
  CommonOptions,
  FilterQuery,
  FindOneOptions,
  MongoClient,
  ObjectId,
  UpdateManyOptions,
  UpdateOneOptions,
  EndCallback,
  MongoCountPreferences
} from "mongodb";
import AR_User from "../../../../ia/gateway/repo/AR_User";

const Strict = new Source<E_User>("user");

const R_User = new AR_User(V_User);

R_User.login = async (arg, args: MongoCountPreferences) =>
  R_User.validator.validate(arg[0])
    ? (await Strict.exists(arg[0], args)) > 0
    : undefined;

R_User.create = async (arg, args: CollectionInsertOneOptions) => {
  if (R_User.validator.validate(arg)) {
    const { firstnames, lastname } = (await Strict.createOne(arg, args)).ops[0];
    return { firstnames, lastname };
  }
};

R_User.read = async (arg, args: FindOneOptions) => {
  if (R_User.validator.validate(arg)) {
    const { firstnames, lastname } = await Strict.readOne(arg, args);
    return { firstnames, lastname };
  }
};

R_User.update = async (filter, update, args: UpdateOneOptions) =>
  R_User.validator.validate(filter, update)
    ? (await Strict.updateOne(filter, update, args)).modifiedCount > 0
    : -1;

R_User.delete = async (filter, args: CommonOptions) =>
  R_User.validator.validate(filter,)
    ? (await Strict.deleteOne(filter,  args)).deletedCount > 0
    : -1;


