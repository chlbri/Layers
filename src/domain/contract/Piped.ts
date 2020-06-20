export default abstract class Piped {
  pipe<O>(func: (arg0: this) => O) {
    return func(this);
  }
}
