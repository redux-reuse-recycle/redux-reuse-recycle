import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";
import * as AST from "../";

export default class ToggleClass extends Class {

    constructor() {
        super(new Map(), [(paramVal: AST.Value) => { return paramVal instanceof AST.Boolean}]);
    }

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitToggleClass(this);
    }

    toString(): string {
        return "toggle";
    }

}
