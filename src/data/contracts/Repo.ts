import IRepo from "../../domain/contract/IRepo";
import { DataTypes } from "../../domain/contract/utils";
import DataProperties from "../../domain/contract/Entity";
import ISource from "./ISource";

abstract class Repo<T extends DataProperties> implements IRepo<T> {
  constructor(public sources: Map<string, ISource<T>>) {}
  abstract create(arg: Partial<T>): DataTypes;
  abstract read(arg: Partial<T>): DataTypes;
  abstract update(filter: Partial<T>, update: Partial<T>): DataTypes;
  abstract delete(arg: string): DataTypes;
}
