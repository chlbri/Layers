import NFunction from "./NFunction";

export default interface IAuth {
  signInWithLoginAndPassword?: NFunction;
  signInWithCredentials?: NFunction;
  signInWithPhoneNumber?: NFunction;
  signOut?: NFunction;
}
