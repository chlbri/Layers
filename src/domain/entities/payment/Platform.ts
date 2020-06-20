import Entity from "../../contract/Entity";
import _Id from "../../contract/_Id";
import ITimestamps from "../../contract/ITimestamps";

export default interface PlatformPayment extends Entity, _Id {
  label: string;
  url: string;
  credentials?: any;
}
