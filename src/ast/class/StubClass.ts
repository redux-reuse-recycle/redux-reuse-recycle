import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";

export default class StubClass extends Class {

    constructor() {
        super(new Map(), []);
    }

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitStubClass(this);
    }

    toString(): string {
        return "stub";
    }

}
