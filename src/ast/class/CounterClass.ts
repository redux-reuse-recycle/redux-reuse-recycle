import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";
import * as AST from "../";

export default class CounterClass extends Class {

    constructor() {
        super(new Map(), [(paramVal: AST.Value) => { return paramVal instanceof AST.Number}]);
    }

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitCounterClass(this);
    }

    toString(): string {
        return 'counter';
    }

}
