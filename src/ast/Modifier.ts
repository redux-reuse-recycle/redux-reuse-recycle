import ASTNode from "./ASTNode";
import ASTVisitor from "../visitor/ASTVisitor";
import Identifier from "./Identifier";

export default class Modifier extends ASTNode {
    public readonly actions: Identifier[];
    public readonly values: Identifier[];

    constructor(actions: Identifier[], values: Identifier[]) {
        super();
        this.actions = actions;
        this.values = values;
    }

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitModifier(this);
    }

}
