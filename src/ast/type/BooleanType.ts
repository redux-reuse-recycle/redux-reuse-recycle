import Type from "./Type";
import TypeVisitor from "../../visitor/type/TypeVisitor";

export default class BooleanType extends Type {

    acceptTypeVisitor(visitor: TypeVisitor): any {
        return visitor.visitBooleanType(this);
    }

}
