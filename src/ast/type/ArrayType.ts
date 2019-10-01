import Type from "./Type";
import AnyType from "./AnyType";
import TypeVisitor from "../../visitor/type/TypeVisitor";

export default class ArrayType extends Type {
    public readonly innerType: Type;

    constructor(innerType: Type = new AnyType()) {
        super();
        this.innerType = innerType;
    }

    acceptTypeVisitor(visitor: TypeVisitor): any {
        return visitor.visitArrayType(this);
    }

}
