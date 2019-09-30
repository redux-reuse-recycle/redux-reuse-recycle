import Primitive from "./Primitive";
import PrimitiveVisitor from "../../visitor/primitive/PrimitiveVisitor";

export default class Boolean extends Primitive {
    constructor(value: boolean = false) {
        super(value);
    }

    acceptPrimitiveVisitor(visitor: PrimitiveVisitor): any {
        return visitor.visitBoolean(this);
    }

}
