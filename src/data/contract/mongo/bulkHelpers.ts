import { FSyncOptions, OrderedBulkOperation } from "mongodb";

export function executeMongoBulks(
  options?: FSyncOptions,
  ...args: OrderedBulkOperation[]
) {
  args.forEach((arg) => arg.execute());
}
