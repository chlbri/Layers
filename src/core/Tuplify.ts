/**
 * Convert Tuple to Union
 */
type TupleToUnion<T extends readonly any[]> = T[number];

export default function Tuplify<T extends any[]>(...args: T) {
  return args;
}

function Objectify<T extends any[]>(...args: T) {
  return args.map(arg=>({[Object.keys(arg)[0]]:arg}))
}

type OptionalExceptFor<
  T,
  TRequired extends keyof T = keyof T
> = Partial<Pick<T, Exclude<keyof T, TRequired>>> &
  Required<Pick<T, TRequired>>;

type LastInTuple<T extends any[], K extends number = 4> = ((
  ...args: T
) => any) extends (...rest: infer R) => any
  ? T[R["length"]]
  : never;

export { TupleToUnion, OptionalExceptFor, LastInTuple, Objectify };
