import Entity from "../Entity";

export default interface MetaData {
  [key: string]: boolean | string;
  isFromApp: boolean;
}
