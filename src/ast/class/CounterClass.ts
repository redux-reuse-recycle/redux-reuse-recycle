import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";

export default class CounterClass extends Class {

    constructor() {
        super(new Map(), [typeof Number]);
    }

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitCounterClass(this);
    }

    toString(): string {
        return 'counter';
    }

}
