import Primitive from "./Primitive";
import PrimitiveVisitor from "../../visitor/primitive/PrimitiveVisitor";

export default class String extends Primitive {
    constructor(value: string = "") {
        super(value);
    }

    acceptPrimitiveVisitor(visitor: PrimitiveVisitor): any {
        return visitor.visitString(this);
    }

    toString(): string {
        return `"${this.value}"`;
    }

}
