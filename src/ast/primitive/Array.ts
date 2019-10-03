import Primitive from "./Primitive";
import PrimitiveVisitor from "../../visitor/primitive/PrimitiveVisitor";
import Type from "../type/Type";

export default class Array extends Primitive {
    public readonly type: Type;
    constructor(t: Type, value: Primitive[] = []) {
        super(value);
        this.type = t;
    }

    acceptPrimitiveVisitor(visitor: PrimitiveVisitor): any {
        return visitor.visitArray(this);
    }

}
