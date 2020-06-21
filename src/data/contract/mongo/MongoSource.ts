import { MongoClientOptions } from "mongodb";
import Database from "../Database";

export default interface MongoSource
  extends Database<MongoClientOptions> {}
