const Fetch = {
  204: "MATCHED",
  200: "COMPLETED",
  300: "FAIL",
  404: "ERROR",
  500: "CONNECTIONFAILED",
} as const;

type FetchStatus = keyof typeof Fetch;
type FetchResponses = typeof Fetch[FetchStatus];

export { Fetch, FetchStatus, FetchResponses };
