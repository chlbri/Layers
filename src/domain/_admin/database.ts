import Database from "../../data/contract/Database";
import { MongoClientOptions } from "mongodb";

const DATABASE: Database<MongoClientOptions> = {
  url: "mongodb://localhost:27017",
  dbName: "Layers",
  // options: {},
};

export default DATABASE;
