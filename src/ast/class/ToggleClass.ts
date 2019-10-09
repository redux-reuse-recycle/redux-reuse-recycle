import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";

export default class ToggleClass extends Class {

    constructor() {
        super(new Map(), [typeof Boolean]);
    }

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitToggleClass(this);
    }

    toString(): string {
        return "toggle";
    }

}
