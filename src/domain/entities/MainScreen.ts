import Entity from "../contract/Entity";
import _Id from "../contract/_Id";
import E_Screen from "./routing/Screen";

export default interface E_MainScreen extends E_Screen {
  label: string;
  prefs: any;
}
