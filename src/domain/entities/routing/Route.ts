import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import E_View from "../design/View";
import { Nullish, NullishString } from "../../../core/Nullish";
import UseCase from "../abr/UseCase";
import E_Screen from "./Screen";

export default interface E_Route extends Entity {
  label: NullishString;
  screen: E_Screen;
}
