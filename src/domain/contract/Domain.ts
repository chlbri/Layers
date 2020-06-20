import IUseCase from "./IUseCase";

type Domain = {
  [P: string]: IUseCase;
};

export default Domain;
