import IRVisitor from "../../visitor/IRVisitor";

abstract class AbstractNode {
    abstract name: string;
    public abstract acceptVisitor(visitor: IRVisitor): any;
}

export default AbstractNode;
