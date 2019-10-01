import ASTNode from "./ASTNode";
import Value from "./Value";
import ASTVisitor from "../visitor/ASTVisitor";

export default class Parameter extends ASTNode {
    public readonly name: string;
    public readonly value: Value;

    constructor(name: string, value: Value) {
        super();
        this.name = name;
        this.value = value;
    }

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitParameter(this);
    }

}
