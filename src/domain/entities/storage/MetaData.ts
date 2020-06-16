import Entity from "../../contract/Entity";

export default interface MetaData extends Entity {
  [key: string]: string;
}
