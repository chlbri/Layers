import uid from "../contract/uid";
import ITimestamps from "../contract/ITimestamps";
import Entity from "../contract/Entity";
import "reflect-metadata";

export default interface E_Task extends Entity<E_Task>, uid, ITimestamps {
  label?: string;
  desc?: string;
}


