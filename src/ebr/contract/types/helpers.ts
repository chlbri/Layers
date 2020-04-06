type Helper<T, K extends keyof T> = Extract<K, keyof T>;

export { Helper };
