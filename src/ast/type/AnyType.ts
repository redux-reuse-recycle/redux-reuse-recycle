import Type from "./Type";
import TypeVisitor from "../../visitor/type/TypeVisitor";

export default class AnyType extends Type {

    acceptTypeVisitor(visitor: TypeVisitor): any {
        return visitor.visitAnyType(this);
    }

}
