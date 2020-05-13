type OTHERS = boolean | number;

type ResultOne<T, K extends keyof T = keyof T, O = OTHERS> = Pick<T, K> | O;

type ResultMany<T, K extends keyof T = keyof T, O = OTHERS> = Pick<T, K>[] | O;

type Query<O = any, I extends any[] = any[]> = (...args: I) => Promise<O>;

export { ResultOne, ResultMany, Query };
