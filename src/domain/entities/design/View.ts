import Entity from "../../contract/Entity";
import uid from "../../contract/uid";
import { FlexStyle } from "./FlexStyle";
import BackgroundStyle from "./Background";
import BorderStyle from "./Border";
import { Nullish } from "../../../core/Nullish";
import UseCase from "../abr/UseCase";

export default interface View extends Entity, uid {
  flex: FlexStyle;
  background: BackgroundStyle;
  border: BorderStyle;
  /**
   * Il doît être entre 0 et 1
   */
  opacity?: number;
  /**
   * Sets the elevation of a view, using Android's underlying
   * [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation).
   * This adds a drop shadow to the item and affects z-order for overlapping views.
   * Only supported on Android 5.0+, has no effect on earlier versions.
   *
   * @platform android
   */
  elevation?: number;
  children: Nullish<View[]>
  useCases: Nullish<UseCase[]>;
}
