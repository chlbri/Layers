const Fetch = {
  204: "MATCHED",
  200: "COMPLETED",
  300: "FAIL",
  404: "ERROR",
  500: "CONNECTIONFAILED",
} as const;

type FetchStatus = keyof typeof Fetch;
type FetchResponses = typeof Fetch[FetchStatus];

function isGood(arg: FetchStatus) {
  return arg < 205;
}

function isFetchStatus(arg: number): arg is FetchStatus {
  const inner = arg.toString();
  return Object.keys(Fetch).includes(inner);
}

function isBad(arg: FetchStatus) {
  return arg > 205;
}



export {
  Fetch,
  FetchStatus,
  FetchResponses,
  isGood,
  isBad,
  isFetchStatus,
};
