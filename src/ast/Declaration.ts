import ASTNode from "./ASTNode";
import Type from "./type/Type";
import Identifier from "./Identifier";
import Value from "./Value";

export default class Declaration extends ASTNode {
  public readonly type: Type;
  public readonly id: Identifier;
  public readonly value: Value;

  constructor(type: Type, id: Identifier, value: Value) {
    super();
    this.type = type;
    this.id = id;
    this.value = value;
  }
}
