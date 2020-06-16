import { DataTypes } from "../../domain/contract/Data";
import Entity from "../../domain/contract/Entity";
import CRUD from "../../domain/contract/crud";

abstract class Repo<T extends Entity> implements CRUD<T> {
  abstract create(arg: Partial<T>): DataTypes;
  abstract read(arg: Partial<T>): DataTypes;
  abstract update(filter: Partial<T>, update: Partial<T>): DataTypes;
  abstract delete(arg: string): DataTypes;
}
