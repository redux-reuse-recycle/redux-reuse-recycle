import Type from "./Type";
import TypeVisitor from "../../visitor/type/TypeVisitor";

export default class NumberType extends Type {

    acceptTypeVisitor(visitor: TypeVisitor): any {
        return visitor.visitNumberType(this);
    }

}
