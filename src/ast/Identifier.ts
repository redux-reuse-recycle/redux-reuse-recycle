import Value from "./Value";
import ASTVisitor from "../visitor/ASTVisitor";

export default class Identifier extends Value {
    public readonly name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitIdentifier(this);
    }

}
