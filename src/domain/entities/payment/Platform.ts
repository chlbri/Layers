import Entity from "../../contract/Entity";
import uid from "../../contract/uid";
import ITimestamps from "../../contract/ITimestamps";

export default interface PlatformPayment extends Entity, uid {
  label: string;
  url: string;
  credentials?: any;
}
