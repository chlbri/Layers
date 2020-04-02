import IUpdate from "./ebr/contract/IUpdate";
import _Id from "./ebr/contract/_Id";
import Generator from "./ia/gateway/contracts/Validator";
import Schema from "./ebr/contract/ISchema";


interface Lol {
  name: string;
  id: number;
}

const c: Schema<IUpdate<Lol>> = {
  propParams: {
    date: d => true,
    before: d => false,
    after: d => true
  },classParams:()=> false
};

const v = new Generator(c);
const response = v.validate({ date: new Date(), after: {} });
console.log(response);
