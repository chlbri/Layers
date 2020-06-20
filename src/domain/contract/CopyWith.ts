import Entity from "./Entity";

export default function CopyWith<T extends Entity>(
  sealed: T,
  change: T
) {
  return { ...sealed, ...change };
}
