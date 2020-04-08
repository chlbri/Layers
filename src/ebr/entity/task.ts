import _Id from "../contract/_Id";
import ITimestamps from "../contract/ITimestamps";
import Entity from "../contract/Entity";
import "reflect-metadata";
import { injectable } from "inversify";

export default interface E_Task extends Entity, _Id, ITimestamps<E_Task> {
  label: string;
  desc: string;
}
