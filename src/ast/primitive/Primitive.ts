import Value from "../Value";

export default abstract class Primitive extends Value {
  public readonly value: any;

  constructor(value: any) {
    super();
    this.value = value;
  }
}
