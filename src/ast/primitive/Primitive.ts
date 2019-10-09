import Value from "../Value";
import ASTVisitor from "../../visitor/ASTVisitor";
import PrimitiveVisitor from "../../visitor/primitive/PrimitiveVisitor";

export default abstract class Primitive extends Value {
    public readonly value: any;

    protected constructor(value: any) {
        super();
        this.value = value;
    }

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitPrimitive(this);
    }

    abstract acceptPrimitiveVisitor(visitor: PrimitiveVisitor): any;

    toString(): string {
        return this.value.toString()
    }

}
