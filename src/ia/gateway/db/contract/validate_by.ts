import Validator from "../../../../ebr/contract/Validator";

export default interface ValidateBy<T>{
  validator:Validator<T>
  validate:boolean
}