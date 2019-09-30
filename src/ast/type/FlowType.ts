import Type from "./Type";
import TypeVisitor from "../../visitor/type/TypeVisitor";

export default class FlowType extends Type {

    acceptTypeVisitor(visitor: TypeVisitor): any {
        return visitor.visitFlowType(this);
    }

}
