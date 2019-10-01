import Class from "./Class";
import ClassVisitor from "../../visitor/class/ClassVisitor";

export default class ToggleClass extends Class {
  // TODO: Toggle Arguments

    acceptPrimitiveVisitor(visitor: ClassVisitor): any {
        return visitor.visitToggleClass(this);
    }


}
