import Entity from "./Entity";
import uid from "./uid";
import ITimestamps from "./ITimestamps";
import IUpdates from "./IUpdates";

export default interface ChangeableEntity
  extends Entity,
    uid,
    ITimestamps,
    IUpdates<ChangeableEntity> {}
