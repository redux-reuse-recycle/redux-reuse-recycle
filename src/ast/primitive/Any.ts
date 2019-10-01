import Primitive from "./Primitive";
import PrimitiveVisitor from "../../visitor/primitive/PrimitiveVisitor";

export default class Any extends Primitive {
    constructor(value: any = "undefined") {
        super(value);
    }

    acceptPrimitiveVisitor(visitor: PrimitiveVisitor): any {
        return visitor.visitAny(this);
    }

}
