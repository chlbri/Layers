import { Reverse } from "../../core/utils";

const ReverseResponse = {
  0: "MATCHED",
  1: "COMPLETED",
  2: "FAIL",
  4: "ERROR",
  5: "CONNECTIONFAILED"
};

const DbResponse = Reverse(ReverseResponse);

type DbTypeResponse = keyof typeof ReverseResponse;

export { DbResponse, DbTypeResponse };
