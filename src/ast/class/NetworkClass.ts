import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";
import * as AST from "../";

export default class NetworkClass extends Class {

    constructor() {
        super(new Map([["url", (paramVal: AST.Value) => { return paramVal instanceof AST.String}],
                ["method", (paramVal: AST.Value) => { return paramVal instanceof AST.String}]]),
            [(paramVal: AST.Value) => { return paramVal instanceof AST.Array}]);
    }

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitNetworkClass(this);
    }

    toString(): string {
        return "network";
    }

}
