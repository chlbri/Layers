import NFunction from "./NFunction";

export default interface Auth {
  signInWithEmailAndPassword?: NFunction;
  signInWithCredentials?: NFunction;
  signInWithPhoneNumber?: NFunction;
  signOut?: NFunction;
}
