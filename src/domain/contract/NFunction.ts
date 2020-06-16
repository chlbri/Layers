type NFunction<I extends any[] = any[], O extends any = any> = (
  ...arg: I
) => O;

export default NFunction;
