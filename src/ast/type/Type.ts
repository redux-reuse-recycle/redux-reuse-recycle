import ASTNode from "../ASTNode";
import ASTVisitor from "../../visitor/ASTVisitor";
import TypeVisitor from "../../visitor/type/TypeVisitor";

export default abstract class Type extends ASTNode {

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitType(this);
    }

    abstract acceptTypeVisitor(visitor: TypeVisitor): any;

}
