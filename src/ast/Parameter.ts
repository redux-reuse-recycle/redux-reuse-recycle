import ASTNode from "./ASTNode";
import Value from "./Value";

export default class Parameter extends ASTNode {
  public readonly name: string;
  public readonly value: Value;

  constructor(name: string, value: Value) {
    super();
    this.name = name;
    this.value = value;
  }
}
