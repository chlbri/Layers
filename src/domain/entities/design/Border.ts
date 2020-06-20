import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import {
  Nullish,
  NullishNumber,
  NullishColor,
} from "../../../core/Nullish";

type Style = Nullish<"solid" | "dotted" | "dashed">;

export default interface BorderStyle extends Entity, _Id {
  borderBottomColor?: NullishColor;
  borderBottomEndRadius?: NullishNumber;
  borderBottomLeftRadius?: NullishNumber;
  borderBottomRightRadius?: NullishNumber;
  borderBottomStartRadius?: NullishNumber;
  borderBottomWidth?: NullishNumber;
  borderColor?: NullishColor;
  borderEndColor?: NullishColor;
  borderLeftColor?: NullishColor;
  borderLeftWidth?: NullishNumber;
  borderRadius?: NullishNumber;
  borderRightColor?: NullishColor;
  borderRightWidth?: NullishNumber;
  borderStartColor?: NullishColor;
  borderStyle?: Style;
  borderTopColor?: NullishColor;
  borderTopEndRadius?: NullishNumber;
  borderTopLeftRadius?: NullishNumber;
  borderTopRightRadius?: NullishNumber;
  borderTopStartRadius?: NullishNumber;
  borderTopWidth?: NullishNumber;
  borderWidth?: NullishNumber;
}
