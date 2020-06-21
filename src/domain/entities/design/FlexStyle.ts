import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import Point from "./Point";
import Measure from "./Measure";
import Ratio from "./Ratio";

type Flex = "flex-start" | "flex-end" | "center";
type Space = "space-between" | "space-around" | "space-evenly";

export interface FlexStyle extends Entity, _Id {
  verticalAlign?: Flex | "stretch" | "baseline";
  alignSelf?: "auto" | Flex | "stretch" | "baseline";
  aspectRatio?: Ratio;
  bottom?: Point;
  display?: "none" | "flex";
  end?: Point;
  flex?: number;
  flexBasis?: number | string;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  height?: number | string;
  horizontalAlign?: Flex | Space;
  left?: Measure;
  margin?: Measure;
  marginBottom?: Measure;
  marginEnd?: Measure;
  marginHorizontal?: Measure;
  marginLeft?: Measure;
  marginRight?: Measure;
  marginStart?: Measure;
  marginTop?: Measure;
  marginVertical?: Measure;
  maxHeight?: Measure;
  maxWidth?: Measure;
  minHeight?: Measure;
  minWidth?: Measure;
  overflow?: "visible" | "hidden" | "scroll";
  padding?: Measure;
  paddingBottom?: Measure;
  paddingEnd?: Measure;
  paddingHorizontal?: Measure;
  paddingLeft?: Measure;
  paddingRight?: Measure;
  paddingStart?: Measure;
  paddingTop?: Measure;
  paddingVertical?: Measure;
  position?: "absolute" | "relative";
  right?: Measure;
  start?: Point;
  top?: Point;
  width?: Measure;
  zIndex?: number;

  /**
   * @platform ios
   */
  direction?: "inherit" | "ltr" | "rtl";
}
