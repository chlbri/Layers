type PropTypes<T extends object> = T extends {
  [rt in keyof T]: infer U;
}
  ? U
  : never;

type DataTypes =
  | boolean
  | string
  | number
  | null
  | undefined
  | Date
  | Array<DataTypes>
  | Map<string, DataTypes>

export { PropTypes, DataTypes };
