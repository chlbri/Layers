import Entity from "../../contract/Entity";
import uid from "../../contract/uid";
import * as Color from "color";
import { Nullish } from "../../../core/Types";
import Image from "./Image";


type InitialInherit = "initial" | "inherit";

import Point from "./Point";

export default interface BackgroundStyle extends Entity, uid {
  color?: Nullish<Color>;
  image?: Nullish<Image>;
  gradient?: Nullish<Color[]>;
  gradientAngle?: Nullish<number>;
  backgroundAttachment?: Nullish<
    "scroll" | "fixed" | "local" | InitialInherit
  >;

  backgroundClip: Nullish<
    "border-box" | "padding-box" | "content-box" | InitialInherit
  >;

  backgroundOrigin: Nullish<
    "padding-box" | "border-box" | "content-box" | InitialInherit
  >;

  backgroundPosition: Nullish<
    | "left-top"
    | "left-center"
    | "left-bottom"
    | "right-top"
    | "right-center"
    | "right-bottom"
    | "center-top"
    | "center-center"
    | "center-bottom"
    | Point
    | InitialInherit
  >;

  backgroundRepeat: Nullish<
    "repeat" | "repeat-x" | "repeat-y" | "no-repeat" | InitialInherit
  >;

  backgroundSize: Nullish<
    "auto" | "length" | "cover" | "contain" | InitialInherit
  >;
}
