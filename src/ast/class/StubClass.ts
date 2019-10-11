import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";
import * as AST from "../";

export default class StubClass extends Class {

    constructor() {
        super(new Map(), [(paramVal: AST.Value) => { return true; }]);
    }

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitStubClass(this);
    }

    toString(): string {
        return "stub";
    }

}
