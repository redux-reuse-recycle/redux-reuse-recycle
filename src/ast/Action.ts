import Value from "./Value";
import ASTVisitor from "../visitor/ASTVisitor";

export default class Action extends Value {

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitAction(this);
    }

}
