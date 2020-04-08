
export default function Dispatcher<T>(group: T, arg: keyof typeof group) {
  return group[arg];
}
