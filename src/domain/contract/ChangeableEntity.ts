import Entity from "./Entity";
import _Id from "./_Id";
import ITimestamps from "./ITimestamps";
import IUpdates from "./IUpdates";

export default interface ChangeableEntity
  extends Entity,
    _Id,
    ITimestamps,
    IUpdates<ChangeableEntity> {}
