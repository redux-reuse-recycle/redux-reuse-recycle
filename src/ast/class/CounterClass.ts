import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";

export default class CounterClass extends Class {
    expectedParams = new Map([]);

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitCounterClass(this);
    }

}
