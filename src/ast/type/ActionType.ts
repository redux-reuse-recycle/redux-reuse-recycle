import Type from "./Type";
import TypeVisitor from "../../visitor/type/TypeVisitor";

export default class ActionType extends Type {

    acceptTypeVisitor(visitor: TypeVisitor): any {
        return visitor.visitActionType(this);
    }

}
