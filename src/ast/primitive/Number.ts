import Primitive from "./Primitive";
import PrimitiveVisitor from "../../visitor/primitive/PrimitiveVisitor";

export default class Number extends Primitive {
    constructor(value: number = 0) {
        super(value);
    }

    acceptPrimitiveVisitor(visitor: PrimitiveVisitor): any {
        return visitor.visitNumber(this);
    }

}
