import Type from "./Type";
import TypeVisitor from "../../visitor/type/TypeVisitor";

export default class JSType extends Type {

    acceptTypeVisitor(visitor: TypeVisitor): any {
        return visitor.visitJSType(this);
    }

}
