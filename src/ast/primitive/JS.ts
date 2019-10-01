import Primitive from "./Primitive";
import PrimitiveVisitor from "../../visitor/primitive/PrimitiveVisitor";

export default class JS extends Primitive {
    constructor(value: string = "undefined") {
        super(value);
    }

    acceptPrimitiveVisitor(visitor: PrimitiveVisitor): any {
        return visitor.visitJS(this);
    }

}
