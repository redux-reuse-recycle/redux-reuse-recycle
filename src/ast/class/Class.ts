import ASTNode from "../ASTNode";
import ASTVisitor from "../../visitor/ASTVisitor";
import ClassVisitor from "../../visitor/class/ClassVisitor";

export default abstract class Class extends ASTNode {
    public readonly expectedParams: Map<string, string>;
    public readonly canModify: string[];

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitClass(this);
    }

    abstract acceptPrimitiveVisitor(visitor: ClassVisitor): any;

}
