import Database from "./Database";
import CRUD from "./crud";
import Entity from "../../domain/contract/Entity";

export default interface DataSource<T extends Entity>
  extends CRUD<T> {
  database: Database;
}
