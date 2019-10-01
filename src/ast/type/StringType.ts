import Type from "./Type";
import TypeVisitor from "../../visitor/type/TypeVisitor";

export default class StringType extends Type {

    acceptTypeVisitor(visitor: TypeVisitor): any {
        return visitor.visitStringType(this);
    }

}
