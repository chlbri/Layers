interface Tst {
  val?: number;
  val2?: string;
}

const Tete: Tst = {
  val: 4,
  val2: "gbtrdtgfrd",
};
const Tete2: Tst = {
  val: 5,
  val2:undefined
};


console.log({ ...Tete, ...Tete2 });
