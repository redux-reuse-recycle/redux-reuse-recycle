import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";

export default class NetworkClass extends Class {
    // TODO: Network Arguments

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitNetworkClass(this);
    }

}
