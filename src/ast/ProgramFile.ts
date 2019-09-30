import ASTNode from "./ASTNode";

import ImportStatement from "./ImportStatement";
import Declaration from "./Declaration";

export default class ProgramFile extends ASTNode {
  public readonly importStatements: ImportStatement[];
  public readonly declarations: Declaration[];

  constructor(importStatements: ImportStatement[], declarations: Declaration[]) {
    super();
    this.importStatements = importStatements;
    this.declarations = declarations;
  }
}
