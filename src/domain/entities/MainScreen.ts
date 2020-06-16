import Entity from "../contract/Entity";
import uid from "../contract/uid";

export default interface MainScreen extends Entity, uid {
  label: string;
  prefs: any;
}
