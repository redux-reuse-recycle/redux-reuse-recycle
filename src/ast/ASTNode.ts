import ASTVisitor from "../visitor/ASTVisitor";

export default abstract class ASTNode {

    abstract acceptASTVisitor(visitor: ASTVisitor): any;

}
