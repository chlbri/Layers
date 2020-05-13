export default function Dispatcher<T>(group: T, arg: keyof T) {
  return group[arg];
}
