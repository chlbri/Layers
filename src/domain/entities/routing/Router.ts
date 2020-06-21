import E_Screen from "./Screen";
import NFunction from "../../contract/NFunction";
import { NOmit } from "../../../core/Types";
import E_Route from "./Route";

interface Options<T> {
  screen: E_Route;
  args?: T[];
  onReject?: NFunction;
  result?: T;
  predicate?: NFunction<T[], boolean>;
}

export default interface E_Router {
  navigateTo(screen: E_Route, ...args: any[]): void;
  screens: E_Route[];
  push<T>(options: [NOmit<Options<T>, "result" | "predicate">]): T;
  pushReplacement<T>(options: [NOmit<Options<T>, "predicate">]): T;
  popAndPush<T>(
    options: [NOmit<Options<T>, "predicate" | "onReject">]
  ): T;
  pop<T>(options: [Pick<Options<T>, "result">]): T;
  pushAndRemoveUntil<T>(options: [NOmit<Options<T>, "result">]): T;
}
