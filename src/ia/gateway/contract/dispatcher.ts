import { DataTypes } from "../../../domain/contract/Data";

/**
 * Retournes une propriété d'un pe constant
 * @param group Il doit être obligatoirement un type constant
 * @param key Le titre [string] d'une propriété de group
 */
export default function Dispatcher<T>(group: T, key: keyof T) {
  return group[key];
}
