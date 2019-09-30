import IRVisitor from "../../visitor/IRVisitor";

abstract class AbstractNode {
    abstract fileName: string;
    public abstract acceptVisitor(visitor: IRVisitor): any;
}

export default AbstractNode;
