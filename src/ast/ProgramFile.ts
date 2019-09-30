import ASTNode from "./ASTNode";

import ImportStatement from "./ImportStatement";
import Declaration from "./Declaration";
import ASTVisitor from "../visitor/ASTVisitor";

export default class ProgramFile extends ASTNode {
    public readonly importStatements: ImportStatement[];
    public readonly declarations: Declaration[];

    constructor(importStatements: ImportStatement[], declarations: Declaration[]) {
        super();
        this.importStatements = importStatements;
        this.declarations = declarations;
    }

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitProgramFile(this);
    }

}
