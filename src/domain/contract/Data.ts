

type DataTypes =
  | boolean
  | string
  | number
  | null
  | undefined
  | Date
  | Array<DataTypes>
  | Map<string, DataTypes>

export { DataTypes };
