import ARepo from "../connector/repo/ARepo";

export default abstract class AUseCase {
  args: ARepo[];

  constructor(...args: ARepo[]) {
    this.args = args;
  }

  abstract exec() : object;
}
