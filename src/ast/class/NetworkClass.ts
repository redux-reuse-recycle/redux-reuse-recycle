import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";

export default class NetworkClass extends Class {
    expectedParams = new Map([["url", typeof String], ["method", typeof String]]);
    canModify = [typeof Array];

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitNetworkClass(this);
    }

}
