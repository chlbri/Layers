import Validator from "../Validator";

export default interface ValidateBy<T>{
  validator:Validator<T>
  validate:boolean
}