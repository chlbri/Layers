type Nullish<T extends {}> = T | null | undefined;

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

type AllowedNames<Base, Condition> = FilterFlags<
  Base,
  Condition
>[keyof Base];

type SubType<Base, Condition> = Pick<
  Base,
  AllowedNames<Base, Condition>
>;

type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export { Nullish, AllowedNames, SubType, Without };
