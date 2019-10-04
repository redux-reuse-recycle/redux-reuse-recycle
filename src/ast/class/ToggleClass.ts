import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";

export default class ToggleClass extends Class {
    expectedParams = new Map([]);

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitToggleClass(this);
    }


}
