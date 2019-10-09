import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";

export default class NetworkClass extends Class {

    constructor() {
        super(new Map([["url", typeof String], ["method", typeof String]]),
            [typeof Array]);
    }

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitNetworkClass(this);
    }

    toString(): string {
        return "network";
    }

}
