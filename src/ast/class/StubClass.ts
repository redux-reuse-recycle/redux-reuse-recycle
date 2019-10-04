import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";

export default class StubClass extends Class {
    expectedParams = new Map([]);
    canModify = [];

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitStubClass(this);
    }

}
