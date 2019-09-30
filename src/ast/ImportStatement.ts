import ASTNode from "./ASTNode";
import Identifier from "./Identifier";

export default class ImportStatement extends ASTNode {
  public readonly filePath: string;
  public readonly id: Identifier;

  constructor(filePath: string, id: Identifier) {
    super();
    this.filePath = filePath;
    this.id = id;
  }
}
