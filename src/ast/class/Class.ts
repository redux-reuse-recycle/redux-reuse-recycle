import ASTNode from "../ASTNode";
import ASTVisitor from "../../visitor/ASTVisitor";
import ClassVisitor from "../../visitor/class/ClassVisitor";

export default abstract class Class extends ASTNode {
    public readonly expectedParams = new Map<string, string>();
    public readonly canModify: string[] = [];

    protected constructor(expectedParams: Map<string, string>, canModify: string[]) {
        super();
        this.expectedParams = expectedParams;
        this.canModify = canModify;
    }

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitClass(this);
    }

    abstract acceptPrimitiveVisitor(visitor: ClassVisitor): any;

    abstract toString(): string;

}
