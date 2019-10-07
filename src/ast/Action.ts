import Value from "./Value";
import ASTVisitor from "../visitor/ASTVisitor";
import Class from "./class/Class";
import Parameter from "./Parameter";

export default class Action extends Value {
    public readonly name: string;
    public readonly clss: Class;
    public readonly params: Parameter[];

    constructor(name: string, c: Class, p: Parameter[]) {
        super();
        this.name = name;
        this.clss = c;
        this.params = p;
    }

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitAction(this);
    }

}
