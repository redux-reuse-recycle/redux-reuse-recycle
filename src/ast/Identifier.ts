import Value from "./Value";

export default class Identifier extends Value {
  public readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
