import ASTNode from "../ASTNode";
import ASTVisitor from "../../visitor/ASTVisitor";
import ClassVisitor from "../../visitor/class/ClassVisitor";
import * as AST from "../";

export default abstract class Class extends ASTNode {
    public readonly expectedParams = new Map<string, ((paramVal: AST.Value) => boolean) >();
    public readonly canModify: ((paramVal: AST.Value) => boolean)[] = [];

    protected constructor(expectedParams: Map<string, ((paramVal: AST.Value) => boolean) >, canModify: ((paramVal: AST.Value) => boolean) []) {
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
