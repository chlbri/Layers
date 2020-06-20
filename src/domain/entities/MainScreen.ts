import Entity from "../contract/Entity";
import _Id from "../contract/_Id";

export default interface MainScreen extends Entity, _Id {
  label: string;
  prefs: any;
}
