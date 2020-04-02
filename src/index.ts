import IUpdate from "./ebr/contract/IUpdate";
import _Id from "./ebr/contract/_Id";
import { Schema } from "mongoose";
import Generator from "./ebr/contract/Generator";

const ve = new Schema();

interface Lol {
  name: string;
  id: number;
}

const c: ISchema<IUpdate<Lol>> = {
  propParams: {
    date: d => true,
    before: d => false,
    after: d => true
  },classParams:()=> false
};

const v = new Generator(c);
const response = v.generate({ date: new Date(), after: {} });
console.log(response);
