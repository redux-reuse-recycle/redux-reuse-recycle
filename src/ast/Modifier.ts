import ASTNode from "./ASTNode";
import Action from "./Action";
import Value from "./Value";
import ASTVisitor from "../visitor/ASTVisitor";

export default class Modifier extends ASTNode {
    public readonly actions: Action[];
    public readonly values: Value[];

    constructor(actions: Action[], values: Value[]) {
        super();
        this.actions = actions;
        this.values = values;
    }

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitModifier(this);
    }

}
