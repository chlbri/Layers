type Flex = "flex-start" | "flex-end" | "center";

type FlexHorizontalContent =
  | Flex
  | "space-between"
  | "space-around"
  | "space-evenly";

type FlexVerticalContent = Flex | "stretch" | "baseline";

export { Flex, FlexVerticalContent, FlexHorizontalContent};
